import express from "express"
import http from "http"
import { Server } from "socket.io" 

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
    }
});

io.on("connection", (socket) => {
//   console.log("A user connected");
  
  socket.on("message", (message) => {  
    io.emit("message", message); 
  });
  socket.on("messageSeen", (messageId) => {
    // Broadcast the 'messageSeen' event to other users
    console.log(messageId)
    // io.emit("messageSeen", messageId);
  });

  socket.on("disconnect", () => {
    io.disconnectSockets()
  });

  
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
