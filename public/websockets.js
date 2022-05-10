var socket = io.connect();

socket.on("connect", function () {
	console.log("Connected");

	socket.on("message", function (message) {
		console.log(message);
	});

	socket.on("disconnect", function () {
		console.log("Disconnected");
	});
});
