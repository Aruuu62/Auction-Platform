const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Bid = sequelize.define("Bid", {
  amount: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Bid;
