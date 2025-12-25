const { Bid, Auction } = require("./models");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // JOIN AUCTION ROOM
    // The frontend will send: socket.emit("join-auction", "auction-123")
    socket.on("join-auction", (auctionId) => {
      socket.join(`auction-${auctionId}`);
      console.log(`User ${socket.id} joined auction room: ${auctionId}`);
    });

    // Chat Logic
    socket.on("send-chat", (data) => {
      // data: { auctionId, message, user }
      io.to(`auction-${data.auctionId}`).emit("chat-message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};