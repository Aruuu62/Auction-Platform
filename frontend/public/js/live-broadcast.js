const socket = io("/");
let peerConnections = {};
let stream;

const localVideo = document.getElementById("localVideo");
const startBtn = document.getElementById("startBtn");

startBtn.onclick = async () => {
  stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = stream;

  socket.emit("broadcaster");
};

socket.on("watcher", (id) => {
  const peer = new RTCPeerConnection();

  peerConnections[id] = peer;

  stream.getTracks().forEach(track => peer.addTrack(track, stream));

  peer.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
    }
  };

  peer.createOffer()
    .then(sdp => peer.setLocalDescription(sdp))
    .then(() => socket.emit("offer", id, peer.localDescription));
});

socket.on("answer", (id, description) => {
  peerConnections[id].setRemoteDescription(description);
});

socket.on("candidate", (id, candidate) => {
  peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});

socket.on("disconnectPeer", (id) => {
  peerConnections[id] && peerConnections[id].close();
  delete peerConnections[id];
});
