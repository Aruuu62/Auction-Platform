const socket = io("/");
let peerConnection;
let remoteVideo = document.getElementById("remoteVideo");

socket.emit("watcher");

socket.on("offer", (id, description) => {
  peerConnection = new RTCPeerConnection();

  peerConnection
    .setRemoteDescription(description)
    .then(() => peerConnection.createAnswer())
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => socket.emit("answer", id, peerConnection.localDescription));

  peerConnection.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
  };

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
    }
  };
});

socket.on("candidate", (id, candidate) => {
  peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

// Live Chat
document.getElementById("sendChat").onclick = () => {
  const msg = document.getElementById("chatInput").value;
  socket.emit("chat", msg);
};

socket.on("chat", msg => {
  const box = document.getElementById("chatBox");
  box.innerHTML += `<p>${msg}</p>`;
});
