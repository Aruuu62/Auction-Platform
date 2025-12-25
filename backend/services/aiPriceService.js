const { Auction } = require("../models");

exports.suggestPrice = async () => {
  const auctions = await Auction.findAll();

  if (auctions.length === 0) return 100; // default base price

  let total = 0;
  auctions.forEach(a => total += a.startPrice);

  return (total / auctions.length).toFixed(2);
};
