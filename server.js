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

let jugador1;
let jugador2;
let espectador;
let jugadores = [];
let espectadores = [];

io.on("connection", (socket) => {
	console.log("conectado", socket.id);
	socket.emit("open", () => console.log("Jugador conectado", socket.id)); //Jugador conectado hace emit

	// socket.on("close", (data) => {
	// 	console.log("Jugador desconectado Node", data);
	// 	jugadores.filter(function (item) {
	// 		return item !== data.id;
	// 	});

	// 	io.to("sala1").emit("conexionGame", { jugadores: jugadores, espectadores: espectadores });
	// }); //Envia mensaje a los clientes de la sala}); //Jugador desconectado

	socket.on("onEscribirLetra", (data) => {
		console.log("onEscribirLetra", data);

		socket.broadcast.emit("actualizarProgreso", { progresoEnemigo: data.progreso });
	}); //Envia mensaje a los clientes de la sala});

	socket.on("conexionGame", (data) => {
		// Recibe los mensajes del cliente

		let frase = [
			"Debía de estar en una fiesta. Tengo los bolsillos vacíos y no llevo abrigo, así que no puedo haberme alejado demasiado. Es tranquilizador. A juzgar por la luz, es por la mañana, así que he debido de pasar toda la noche aquí fuera. Nadie se viste para pasar la velada a solas, lo cual significa que debe de haber alguien que ya sabe que he desaparecido. Seguramente, más allá de esos árboles, haya una casa que despierta alarmada, ¿y quizá grupos de búsqueda que tratan de encontrarme? Exploro los árboles con la mirada, en cierto modo con la esperanza de ver a mis amigos salir de entre el follaje para escoltarme de vuelta a casa con palmadas en la espalda y bromas amables, pero las ensoñaciones no me sacarán de este bosque y no puedo demorarme aquí esperando un rescate.",
		];

		if (jugador1 == undefined) {
			jugador1 = { id: data.jugador1 };
			jugadores.push(jugador1);
			console.log(jugadores);
		} else {
			if (jugador2 == undefined) {
				jugador2 = { id: data.jugador1 };
				jugadores.push(jugador2);
				console.log(jugadores);
			} else {
				espectador = { id: data.jugador1 };
				espectadores.push(espectador);
			}
		}
		socket.join("sala1"); // En un futuro, tener varias salas
		io.to("sala1").emit("conexionGame", { jugadores: jugadores, espectadores: espectadores, frase: frase }); //Envia mensaje a los clientes de la sala
	});
});

// mongo

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
