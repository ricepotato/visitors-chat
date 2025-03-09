function init() {
  console.log("init");
  const socket = new WebSocket("ws://localhost:3000");
  socket.addEventListener("open", () => {
    console.log("connected to Server ✅");
  });
  socket.addEventListener("message", (messageEvent) => {
    console.log(messageEvent);
    const message = messageEvent.data;
    console.log(`message: ${message}`);
  });
  socket.addEventListener("close", () => {
    console.log("disconnected from Server ❌");
  });

  addUIEventHandlers(socket);
}

// UI

function addUIEventHandlers(socket) {
  const sendButton = document.getElementById("send");
  sendButton.addEventListener("click", () => {
    const message = document.getElementById("message").value;
    socket.send(message);
  });
}

init();
