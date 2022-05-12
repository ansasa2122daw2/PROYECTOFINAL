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

// let jugador1;
// let jugador2;
// let espectador;
// let jugadores = [];
// let espectadores = [];

io.on("connection", (socket) => {
	console.log("conectado", socket.id);
	socket.emit("open", () => console.log("Jugador conectado", socket.id)); //Jugador conectado hace emit
	socket.emit("close", () => console.log("Jugador desconectado")); //Jugador desconectado
	socket.on("");

	socket.on("jugador1JOIN", (data) => {
		console.log(data.jugador1);
	});
	// socket.on("conexionGame", (data) => {
	// 	//Recibe los mensajes del cliente

	// 	if (jugador1 == undefined) {
	// 		jugador1 = { id: data.jugador1 };
	// 		jugadores.push(jugador1);
	// 		console.log(jugadores);
	// 	} else {
	// 		if (jugador2 == undefined) {
	// 			jugador2 = { id: data.jugador };
	// 			jugadores.push(jugador2);
	// 			console.log(jugadores);
	// 		} else {
	// 			espectador = { id: data.jugador };
	// 			espectadores.push(espectador);
	// 		}
	// 	}
	// 	socket.emit("conexionGame", { jugadores: jugadores, espectadores: espectadores }); //Envia mensaje a los clientes
	// });
});

//server

server.listen(process.env.PORT || 3000, () => {
	console.log("listening on *:3000");
});

// Para servir local en puerto 3000
// 		npm run start
// Para deploy a Heroku
// 		git add .
//		git commit -am "Comentario"
// 		git push heroku master
