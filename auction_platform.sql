
-- SQL dump for Online Auction Platform
CREATE DATABASE IF NOT EXISTS auction_platform;
USE auction_platform;

-- Users table
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  isBanned BOOLEAN DEFAULT FALSE,
  createdAt DATETIME,
  updatedAt DATETIME
);

-- KYC table
CREATE TABLE IF NOT EXISTS KYCs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nationalId VARCHAR(255),
  address TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  userId INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Auctions table
CREATE TABLE IF NOT EXISTS Auctions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  startPrice FLOAT,
  instantBuyPrice FLOAT,
  status VARCHAR(50) DEFAULT 'pending',
  endTime DATETIME,
  sellerId INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (sellerId) REFERENCES Users(id)
);

-- Bids table
CREATE TABLE IF NOT EXISTS Bids (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount FLOAT,
  userId INT,
  auctionId INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (auctionId) REFERENCES Auctions(id)
);

-- Payments table
CREATE TABLE IF NOT EXISTS Payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount FLOAT,
  status VARCHAR(50) DEFAULT 'holding',
  auctionId INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (auctionId) REFERENCES Auctions(id)
);

