import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";

dotenv.config();

const app: Express = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "서버가 정상적으로 실행중입니다!" });
});

// 서버 포트 설정
const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`서버가 포트 ${PORT}에서 실행중입니다`);
// });

const handleListen = () => console.log(`서버가 포트 ${PORT}에서 실행중입니다`);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function handleConnection(socket: WebSocket) {
  console.log("클라이언트가 연결되었습니다. ✅");
  socket.send("[Server] 서버에 연결되었습니다.");

  socket.onclose = () => {
    console.log("클라이언트가 연결을 끊었습니다. ❌");
  };

  socket.onmessage = (messageEvent) => {
    const message = messageEvent.data;
    console.log(`message from client: ${message}`);
  };
}

wss.on("connection", handleConnection);

server.listen(PORT, handleListen);
