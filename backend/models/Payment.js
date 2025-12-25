const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define("Payment", {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: {
    type: DataTypes.STRING,
    defaultValue: "holding" // holding → released → refunded
  }
});

module.exports = Payment;
