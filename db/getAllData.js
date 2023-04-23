const fs = require("fs");
// const data = require("./data.json");
const path = require("path");
function getAllData() {
  const data = JSON.parse(
    fs.readFileSync(path.resolve("./db/data.json"), "utf-8")
  );
  return data;
}

module.exports = getAllData;
