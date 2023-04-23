const express = require("express");
const getAllData = require("./db/getAllData");
const setData = require("./db/setData");
const app = express();
let count = 1;

app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/ping", (req, res) => {
  let { path, ip, originalUrl } = req;
  console.log(count, ". ", path, ip, originalUrl);
  count++;
  setData();
  res.json({ success: true });
});

app.get("/api/data", (req, res) => {
  const data = getAllData();
  res.json(data);
});

app.listen(3000, () => {
  console.log("server started");
});
