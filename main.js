const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const getAllData = require("./db/getAllData");
const setData = require("./db/setData");
let count = 1;

app.use(express.static("static"));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/ping", (req, res) => {
  let { path, ip, originalUrl } = req;
  console.log(count, ". ", path, ip, originalUrl);
  count++;
  setData();
  io.emit("mail-received", getAllData());
  res.json({ success: true });
});

app.get("/api/data", (req, res) => {
  const data = getAllData();
  res.json(data);
});

server.listen(3000, () => {
  console.log("server started");
});
