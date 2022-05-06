const express = require("express");
const app = express();
var path = require("path");
const http = require("http");
var bodyParser = require("body-parser");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// var jsScript = require("./script");

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "assets")));

// app.get("/", (req, res) => {
// 	res.sendFile(__dirname + "/index.html");
// });

// app.get("/solo", (req, res) => {
// 	res.sendFile(__dirname + "/solojugador.html");
// });

// app.use("/solo", jsScript);

app.get("/multiplayer", (req, res) => {
	res.sendFile(__dirname + "/websockets.html");
});

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});

//STANDALONE
// const io = require('socket.io')();
// io.on('connection', client => { ... });
// io.listen(3000);
