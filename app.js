const express = require("express");
const path = require("path");
const app = express();

const http = require("http");
const socket = require("socket.io");
const { disconnect } = require("process");
const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data) {
       io.emit("receive-location", {id: socket.id, ...data}) ;
    });
    console.log("a new connection");

    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
