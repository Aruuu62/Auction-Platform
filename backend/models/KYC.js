const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const KYC = sequelize.define("KYC", {
  nationalId: { type: DataTypes.STRING },
  documentImage: { type: DataTypes.STRING }, // file name
  status: { type: DataTypes.STRING, defaultValue: "pending" }
});

module.exports = KYC;
