const fs = require("fs");
const data = require("./data.json");
const path = require("path");

function setData() {
  const date = new Date().toLocaleDateString("in");
  const time = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  let dataOnDate = data[date];
  if (dataOnDate) {
    dataOnDate.push(time);
  } else {
    dataOnDate = [];
    dataOnDate.push(time);
  }
  data[date] = dataOnDate;

  fs.writeFileSync(
    path.resolve("./db/data.json"),
    JSON.stringify(data),
    "utf-8"
  );
}

module.exports = setData;
