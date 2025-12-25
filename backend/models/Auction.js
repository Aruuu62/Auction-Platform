const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Auction = sequelize.define("Auction", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  startPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currentPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
  instantBuyPrice: {
    type: DataTypes.FLOAT,
  },
});

module.exports = (sequelize, DataTypes) => {
  const Auction = sequelize.define("Auction", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    startPrice: DataTypes.FLOAT,
    currentPrice: DataTypes.FLOAT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    image: DataTypes.STRING,
    
    // --- UPDATE THIS FIELD ---
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending" // <--- CHANGED FROM 'active' TO 'pending'
    }
  });

  Auction.associate = (models) => {
    Auction.belongsTo(models.User);
    Auction.hasMany(models.Bid);
  };

  return Auction;
};


module.exports = Auction;