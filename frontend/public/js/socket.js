const socket = io();

function sendBid(auctionId, amount, user) {
  socket.emit("placeBid", { auctionId, amount, user });
}

socket.on("newBid", (data) => {
  if (window.location.pathname.includes(`/auction/${data.auctionId}`)) {
    document.getElementById("currentPrice").innerText = data.amount;
  }
});
