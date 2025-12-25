const sequelize = require("../config/db");

const User = require("./User");
const KYC = require("./KYC");
const Auction = require("./Auction");
const Bid = require("./Bid");
const Payment = require("./Payment");


// Relationships
User.hasOne(KYC, { onDelete: "CASCADE" });
KYC.belongsTo(User);

User.hasMany(Auction);
Auction.belongsTo(User);

Auction.hasMany(Bid);
Bid.belongsTo(Auction);

User.hasMany(Bid);
Bid.belongsTo(User);

Auction.hasOne(Payment);
Payment.belongsTo(Auction);

module.exports = {
  sequelize,
  User,
  KYC,
  Auction,
  Bid,
  Payment
};
