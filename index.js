const express = require("express");
const mapbox = require("mapbox-gl");
const fs = require("fs");

const app = express();

const port = 8001;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  let doc = fs.readFileSync("index.html");
  res.send(doc);
})

app.listen(port, () => {
  console.log("node app listening on port " + port);
})