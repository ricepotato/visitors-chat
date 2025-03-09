function init() {
  console.log("init");
  const socket = new WebSocket("ws://localhost:3000");

  handleOpen(socket);
  handleMessage(socket);
  handleClose(socket);

  addUIEventHandlers(socket);
}

// Socket Events

function handleOpen(socket) {
  socket.addEventListener("open", () => {
    console.log("connected to Server ✅");
  });
}

function handleMessage(socket) {
  socket.addEventListener("message", (messageEvent) => {
    const message = messageEvent.data;
    console.log(`message: ${message}`);
    messageParser(message);
  });
}

function handleClose(socket) {
  socket.addEventListener("close", () => {
    console.log("disconnected from Server ❌");
  });
}

function messageParser(message) {
  const parsedMessage = JSON.parse(message);
  console.log(parsedMessage);

  if (parsedMessage.type === "connectionCount") {
    const connectionCount = document.getElementById("connectionCount");
    connectionCount.textContent = parsedMessage.data;
  }

  if (parsedMessage.type === "hello") {
    const helloMessage = document.getElementById("helloMessage");
    console.log(helloMessage);
  }
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
