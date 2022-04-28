// const express = require("express");
// const http = require("http");
// const path = require("path");
// const app = express();
// const port = 3000;
// let arrayPartides = [];

// const { Server } = require("socket.io");

// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static(__dirname + "/public"));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("", (req, res) => {
// 	res.sendFile(path.join(__dirname, "/index.html"));
// });

// app.get("/multijugador", (req, res) => {
// 	res.sendFile(path.join(__dirname, "/websockets.html"));
// });

// app.get("/jugador", (req, res) => {
// 	res.sendFile(path.join(__dirname, "/solojugador.html"));
// });

// app.listen(port, () => {
// 	console.log(`Example app listening on port ${port}`);
// });

// /* WEBSOCKETS */

// io.on("connection", (socket) => {
// 	console.log("a user connected");
// 	socket.on("disconnect", () => {
// 		console.log("user disconnected");
// 	});
// });
