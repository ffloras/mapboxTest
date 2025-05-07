const express = require("express");
const mapbox = require("mapbox-gl");
const fs = require("fs");

const app = express();

const port = 8001;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  let doc = fs.readFileSync("index.html", "utf8");
  res.send(doc);
});

app.get("/geocoding", (req, res) => {
  let doc = fs.readFileSync("geocoding.html", "utf8");
  res.send(doc);
});

app.get("/leaflet", (req, res) => {
  let doc = fs.readFileSync("leaflet.html", "utf8");
  res.send(doc);
});

app.listen(port, () => {
  console.log("node app listening on port " + port);
})