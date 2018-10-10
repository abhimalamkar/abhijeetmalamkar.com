import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import http from "http";
import socketIo from "socket.io";
import axios from "axios";

import auth from "./route/auth";
import users from "./route/users";



dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true }
);

// const server = http.createServer(app);
// const io = socketIo(server);


// io.sockets.on("connection", socket => {
//   console.log("client connect", socket.id , io.engine.clientsCount);

//   socket.on("SEND_MESSAGE", data => {
//     postComment(data,io)
//   });

//   socket.on("TYPING_MESSAGE_STARTED", data => {
//     typing(data,io)
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected", socket.id , io.engine.clientsCount);
//   });
// });

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

app.use("/api/auth", auth);
app.use("/api/users", users);
// app.use("/api/stories", stories);
// app.use("/api/utils", utils);
app.use("/uploads", express.static("uploads"));

// app.use( express.static( `${__dirname}/../../app/build` ) );

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '/../../app/build/index.html'));
// })

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log("Running on localhost:8080"));

//server.listen(8080, () => console.log("Running on localhost:8080"));
