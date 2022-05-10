const express = require("express");
const app = express();
var path = require("path");
const http = require("http");
var bodyParser = require("body-parser");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get("/solo", (req, res) => {
	res.sendFile(__dirname + "/solojugador.html");
});

app.get("/puntuaciones", (req, res) => {
	res.sendFile(__dirname + "/puntuaciones.html");
});

app.get("/multiplayer", (req, res) => {
	res.sendFile(__dirname + "/websockets.html");
});

//websockets

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(process.env.PORT || 3000, () => {
	console.log("listening on *:3000");
});

// Para servir local en puerto 3000
// 		npm run start
// Para deploy a Heroku
// 		git add .
//		git commit -am "Comentario"
// 		git push heroku master
