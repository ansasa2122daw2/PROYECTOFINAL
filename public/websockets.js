var socket = io.connect();

socket.on("connect", function () {
	console.log("Jugador 1 conectado");

	// let socketID = Math.random() * 100000;
	// socket.emit("conexionGame", { jugador: socketID });

	// socket.on("conexionGame", (data) => {
	// 	if (data.jugador1[0].id == socket.socketID) {
	// 		let jugador1 = document.getElementById("jugador1");
	// 		jugador1.innerHTML = '<img src="../assets/1websockets.png" width="60px" height="60px">';
	// 		socket.emit("jugador1JOIN", { IMG: jugador1 });
	// 	}
	// });

	socket.on("disconnect", function () {
		console.log("Disconnected");
	});
});
