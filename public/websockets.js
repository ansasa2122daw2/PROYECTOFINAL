var socket = io.connect();

socket.on("connect", function () {
	socket.on("open", function (data) {
		let jugador1 = document.getElementById("jugador1");
		jugador1.innerHTML = '<img src="../assets/1websockets.png" width="60px" height="60px">';
		socket.emit("jugador1JOIN", { IMG: jugador1 });
		console.log("Jugador 1 conectado" + socket.id);
	});

	socket.on("close", function () {
		console.log("Jugador desconectado");
	});
});
