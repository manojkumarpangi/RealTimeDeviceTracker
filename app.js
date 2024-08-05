const express = require("express");
const path = require("path");
const app = express();

const http = require("http");
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.send("Hello World!");
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
