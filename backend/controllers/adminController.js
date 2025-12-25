const { Auction, User } = require("../models");

// 1. GET ADMIN DASHBOARD
exports.getAdminDashboard = async (req, res) => {
  try {
    // A. Fetch Pending Auctions (Waiting for approval)
    const pendingAuctions = await Auction.findAll({
      where: { status: 'pending' },
      include: [User],
      order: [['createdAt', 'ASC']]
    });

    // B. Fetch Active Auctions (Live on site)
    const activeAuctions = await Auction.findAll({
      where: { status: 'active' },
      include: [User],
      order: [['createdAt', 'DESC']]
    });

    // C. Render the View and PASS THE VARIABLES
    res.render("admin/dashboard", {
      user: req.user,
      pending: pendingAuctions, // <--- This fixes your error
      active: activeAuctions
    });

  } catch (err) {
    console.error("Admin Dashboard Error:", err);
    // If error, redirect to home instead of crashing
    res.redirect("/");
  }
};

// 2. APPROVE AUCTION
exports.approveAuction = async (req, res) => {
  try {
    const { id } = req.params;
    await Auction.update({ status: 'active' }, { where: { id } });
    res.redirect("/api/admin/dashboard");
  } catch (err) {
    console.error("Approve Error:", err);
    res.redirect("/api/admin/dashboard");
  }
};

// 3. REJECT AUCTION
exports.rejectAuction = async (req, res) => {
  try {
    const { id } = req.params;
    await Auction.destroy({ where: { id } });
    res.redirect("/api/admin/dashboard");
  } catch (err) {
    console.error("Reject Error:", err);
    res.redirect("/api/admin/dashboard");
  }
};

// 4. END AUCTION EARLY (Time Off)
exports.endAuctionEarly = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Set endTime to NOW so it closes immediately
    await Auction.update(
        { endTime: new Date() }, 
        { where: { id } }
    );
    
    res.redirect("/api/admin/dashboard");
  } catch (err) {
    console.error("End Early Error:", err);
    res.redirect("/api/admin/dashboard");
  }
};