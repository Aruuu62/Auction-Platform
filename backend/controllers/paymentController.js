const { Payment, Auction } = require("../models");
const { holdFunds, releaseFunds } = require("../services/escrowService");

// BUY NOW
exports.instantBuy = async (req, res) => {
  try {
    const auction = await Auction.findByPk(req.params.id);

    if (!auction) return res.status(404).json({ message: "Auction not found" });
    if (!auction.instantBuyPrice)
      return res
        .status(400)
        .json({ message: "This auction does not support instant buy" });

    // Create escrow hold
    const escrowResult = await holdFunds(auction.instantBuyPrice);

    const payment = await Payment.create({
      amount: auction.instantBuyPrice,
      status: escrowResult.status,
      AuctionId: auction.id
    });

    auction.status = "sold";
    await auction.save();

    res.json({
      message: "Item purchased & funds held in escrow.",
      payment
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN RELEASES PAYMENT
exports.releasePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);

    if (!payment)
      return res.status(404).json({ message: "Payment not found" });

    const escrowResult = await releaseFunds(payment.amount);

    payment.status = escrowResult.status;
    await payment.save();

    res.json({
      message: "Payment released to seller.",
      payment
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
