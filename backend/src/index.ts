import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import { UserManager } from "./managers/UserManager";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userManager = new UserManager();
let name:string;

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  socket.on("name", (data)=>{
    console.log("receiving name",data)
    userManager.addUser(data, socket)
  })

  socket.on("disconnect", ()=>{
    userManager.removeUser(socket.id);
  })
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
