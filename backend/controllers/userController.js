const { Bid, Auction } = require("../models");

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Fetch My Bids (What I am buying)
    const myBids = await Bid.findAll({
      where: { UserId: userId },
      include: [{ model: Auction, attributes: ['id', 'title', 'currentPrice', 'endTime', 'status'] }],
      order: [['createdAt', 'DESC']]
    });

    // 2. Fetch My Listings (What I am selling)
    const myListings = await Auction.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'DESC']]
    });

    res.render("user/dashboard", {
      user: req.user,
      bids: myBids,
      listings: myListings // Pass this new data to the view
    });

  } catch (err) {
    console.error("User Dashboard Error:", err);
    res.redirect("/");
  }
};