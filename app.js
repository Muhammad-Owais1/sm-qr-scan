const compression = require("compression");
const express = require("express");
const http = require("http");
// const https = require('https');
const path = require("path");
// const fs = require("fs");

const app = express();
app.use(compression());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/dist/my-project"));
app.use(express.static(__dirname + "/dist/my-project/browser"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/my-project/browser/index.html"));
});

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);
// Start the app by listening on the default Heroku port
server.listen(port, () => console.log("Running..."));
