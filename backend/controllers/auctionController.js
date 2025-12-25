const { Auction, User, Bid } = require("../models");
const path = require("path");
const fs = require("fs");

// 1. RENDER CREATE PAGE
exports.renderCreatePage = (req, res) => {
  res.render("auction/create", { title: "Create Auction", user: req.user });
};

// 2. CREATE AUCTION (The Fix is Here)
exports.createAuction = async (req, res) => {
  try {
    const { title, description, startPrice, startTime, endTime } = req.body;
    let imageFilename = null;

    if (req.file) {
      imageFilename = req.file.filename;
    }

    await Auction.create({
      title,
      description,
      startPrice: parseFloat(startPrice),
      currentPrice: parseFloat(startPrice),
      startTime: startTime || new Date(),
      endTime: endTime,
      image: imageFilename,
      UserId: req.user.id,
      status: 'pending' // <--- FORCE STATUS TO PENDING
    });

    // Redirect to User Dashboard so they can see their "Pending" item
    res.redirect("/api/user/dashboard");

  } catch (err) {
    console.error("Create Error:", err);
    res.render("auction/create", { title: "Create", error: "Failed to create auction", user: req.user });
  }
};

// 3. GET ALL ACTIVE AUCTIONS (Public List)
exports.getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.findAll({
      where: { status: 'active' }, // <--- ONLY SHOW APPROVED ITEMS
      order: [["createdAt", "DESC"]],
    });
    res.render("auction/list", { title: "Active Auctions", auctions, user: req.user });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

// 4. GET SINGLE DETAILS
exports.getAuctionDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByPk(id, {
      include: [
        { model: User, attributes: ["name"] },
        { model: Bid, include: [User], order: [["amount", "DESC"]], limit: 10 }
      ],
    });

    if (!auction) return res.redirect("/api/auction");

    // Optional: Hide page if pending and user is not the owner/admin
    if(auction.status === 'pending' && req.user.role !== 'admin' && req.user.id !== auction.UserId) {
        return res.redirect("/api/auction");
    }

    res.render("auction/details", { title: auction.title, auction, user: req.user });
  } catch (err) {
    console.error(err);
    res.redirect("/api/auction");
  }
};

// 5. PLACE BID
exports.placeBid = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    
    const auction = await Auction.findByPk(id);
    if (!auction) return res.status(404).json({ message: "Not found" });

    if (new Date(auction.startTime) > new Date()) return res.status(400).json({ message: "Not started yet" });
    if (new Date(auction.endTime) < new Date()) return res.status(400).json({ message: "Auction ended" });
    if (parseFloat(amount) <= auction.currentPrice) return res.status(400).json({ message: "Bid too low" });

    auction.currentPrice = parseFloat(amount);
    await auction.save();
    
    // Save Bid with User ID
    const newBid = await Bid.create({ 
        amount: parseFloat(amount), 
        UserId: req.user.id, 
        AuctionId: id 
    });

    // Fetch User Name for Socket Broadcast
    const user = await User.findByPk(req.user.id);

    // Socket Broadcast
    const io = req.app.get("socketio");
    if(io) {
        io.to(`auction-${id}`).emit("bid-updated", { 
            price: auction.currentPrice, 
            user: user.name 
        });
    }

    res.json({ message: "Success", currentPrice: auction.currentPrice });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 6. DELETE AUCTION
exports.deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByPk(id);

    if (!auction) return res.status(404).send("Not Found");

    // Security: Only Admin or Owner can delete
    if (req.user.role !== 'admin' && req.user.id !== auction.UserId) {
        return res.status(403).send("Unauthorized");
    }

    if (auction.image) {
        const imagePath = path.join(__dirname, '../../frontend/public/uploads/', auction.image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await auction.destroy();
    
    // Redirect based on who deleted it
    if(req.user.role === 'admin') {
        res.redirect('/api/admin/dashboard');
    } else {
        res.redirect('/api/user/dashboard');
    }

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).send("Server Error");
  }
};