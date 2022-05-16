var socket = io.connect();
socket.on("connect", function () {
	//CARGO LA PAGINA CON INIT
	window.addEventListener("load", init);

	let solucion = [];

	//DOM
	let frases = document.getElementById("randomize");
	let input = document.getElementById("input");
	let timer = document.getElementById("time");
	let solucionDIV = document.getElementById("bodymulti");
	let texto = document.getElementById("typing-texto");

	//creacion de los progress
	let myProgress = document.getElementById("myProgress");
	myProgress.innerHTML = "<progress id='innerProgressBar' value='0' max='100'>32%</progress>";
	let innerProgressBar = document.getElementById("innerProgressBar");

	let theirProgress = document.getElementById("theirProgress");
	theirProgress.innerHTML = "<progress id='theirInnerProgressBar' value='0' max='100'>32%</progress>";
	let theirInnerProgressBar = document.getElementById("theirInnerProgressBar");

	//declaro
	const tiempoFijo = 30;
	let time = tiempoFijo;
	let jugador = true;
	const palabras = 0;
	//dificultad
	var dificultat = { facil: 10, medio: 30, dificil: 60 };
	var currentLevel = 30;
	var leveltimer = 30;

	//eventos
	input.addEventListener("input", () => {
		let frasesSpan = frases.querySelectorAll("span");
		//haces split de los valores para compararlos con el parrafo
		let arrayValue = input.value.split("");
		innerProgressBar.setAttribute("value", JSON.stringify((arrayValue.length / frasesSpan.length) * 100));
		socket.emit("onEscribirLetra", { progreso: (arrayValue.length / frasesSpan.length) * 100 });
		frasesSpan.forEach((characterS, index) => {
			let character = arrayValue[index];
			if (character[index] === undefined) {
				characterS.classList.remove("incorrect");
				characterS.classList.remove("correct");
			}
			if (character && character === characterS.innerText) {
				characterS.classList.add("correct");
				characterS.classList.remove("incorrect");
			} else {
				characterS.classList.add("incorrect");
				characterS.classList.remove("correct");
			}
		});
	});

	//Cuando clickas empieza el contador
	input.addEventListener(
		"input",
		() => {
			//timer
			setInterval(countdown, 1000);
		},
		{ once: true }
	);

	//FUNCIÓN PRINCIPAL
	function init() {
		//connexion socket = pasa la frase del servidor
		socket.on("conexionGame", function (data) {
			console.log(data.frase.length);
			debugger;
			muestra(data.frase);
		});

		//si timer 0 entonces:
		setInterval(check, 50);
	}

	function muestra(parafos) {
		const random = Math.floor(Math.random() * parafos.length);
		frases.innerHTML = ""; //parafos[random]
		input.value = null;
		//console.log(parafos[random].split(""));
		console.log(parafos[random]);
		console.log(parafos[random].split(""));
		solucion = parafos[random];
		console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee", solucion);
		//haces split de los parafos para que luego compruebe caracter por caracter
		const prueba = solucion.split("").forEach((character) => {
			const characterS = document.createElement("span");
			characterS.innerText = character;
			frases.appendChild(characterS);
			characterS.classList.add("fuenteparrafo");
		});
	}

	let arrayWPM_Partida = [];
	let countUp = 1;
	let arrayLabel_partida = [countUp];
	let arrayErrores_partida = [];

	function countdown() {
		if (currentLevel > 0) {
			currentLevel--;
		}
		if (currentLevel === 0) {
			jugador = false;
		}
		timer.innerHTML = currentLevel;

		let solucionArray = solucion.split(" ");
		let inputArray = input.value.split(" ");
		let palabrasCorrectas = 0;
		let errores = 0;

		//for de count porque va contando cada segundo
		for (let i = 1; i <= countUp; i++) {
			if (solucionArray[i] === inputArray[i]) {
				palabrasCorrectas++;
			} else {
				errores++;
			}
		}

		//primero se hace ++ y luego se guarda en la variable
		++countUp;

		//se hace push al label parar que ponga todos los segundos que el usuario ha escrito
		arrayLabel_partida.push(countUp);
		//push de los errores
		arrayErrores_partida.push(errores);
		//push del wpm segun si ha escrito la palabra correcta en ese segundo
		arrayWPM_Partida.push(Math.floor((palabrasCorrectas * 60) / countUp).toFixed(0));
	}

	//declarar valores
	let wpm = 0;
	let accuracy = 0;

	function check() {
		if (!jugador && currentLevel === 0) {
			input.disabled = "true";

			let solucionArray = solucion.split(" ");
			let inputArray = input.value.split(" ");
			let palabrasCorrectas = 0;

			for (let i = 0; i < solucionArray.length; i++) {
				if (solucionArray[i] === inputArray[i]) {
					palabrasCorrectas++;
				}
			}
			wpm = Math.floor((palabrasCorrectas * 60) / leveltimer).toFixed(0);
			accuracy = Math.floor((palabrasCorrectas / solucionArray.length) * 100).toFixed(2);

			socket.emit("puntuacionesEnemigo", { wpm: wpm, acc: accuracy });

			socket.on("puntuacionesFinal", (data) => {
				if (data.finalEnemigo) {
					console.log("wpm enemigo: " + data.finalEnemigo);
					solucionDIV.innerHTML =
						"<div id='flex'><div id='queTu'>TU PUNTUACIÓN</div><div id='tituloTuWPM'>WPM  " +
						"<div id='respuestaTuWPM'>" +
						wpm +
						"</div></div>" +
						"<br/>" +
						"<br/>" +
						"<div id='tituloTuACC'>ACC  </div>" +
						"<div id='respuestaTuACC'>" +
						accuracy +
						"%" +
						"</div><div id='que'>ENEMIGO</div><div id='titulosEWPM'>WPM ENMIGO: " +
						"<div id='respuestaEWPM'>" +
						data.finalEnemigo.wpm +
						"</div></div>" +
						"<div id='titulosEACC'>ACC ENMIGO: " +
						"<div id='respuestaEACC'>" +
						data.finalEnemigo.acc +
						"</div></div></div></div>";
					"<br/>" + "<br/>" + "<br/>" + "<br/>" + "<div id='titulos'> PALABRAS: " + solucionArray.length + " - IDIOMA: " + "Castellano" + " - TIEMPO: " + leveltimer + "s" + "</div>";
					solucionDIV.classList.add("solucionDIV");
				} else {
					solucionDIV.innerHTML = "Esperando a que el adversario acabe...";
				}
			});
			// solucionDIV.innerHTML = "<div id='que'>TU PUNTUACIÓN</div><div id='titulos'>WPM  " + "<div id='respuesta'>" + wpm + "</div></div>" + "<br/>" + "<br/>" + "<div id='titulos'>ACC  </div>" + "<div id='respuesta'>" + accuracy + "%" + "</div>" + "<br/>" + "<br/>" + "<br/>" + "<br/>" + "<div id='titulos'> PALABRAS: " + solucionArray.length + " - IDIOMA: " + "Castellano" + " - TIEMPO: " + leveltimer + "s" + "</div>";
			// solucionDIV.classList.add("solucionDIV");
		}
	}

	socket.on("open", function (data) {
		console.log("Jugador 1 conectado" + socket.id);
	});

	socket.emit("conexionGame", { jugador1: socket.id });

	// socket.on("conexionGame", (data) => {
	// 	console.log(data.jugadores[0].id, data.jugadores[1]?.id);
	// 	let jugador1 = document.getElementById("jugador1");
	// 	if (data.jugadores[0].id == socket.id) {
	// 		// jugador1.innerHTML = '<img src="../assets/1websockets.png" width="60px" height="60px">'; // Eres el jug1
	// 	} else {
	// 		if (data.jugadores[1].id == socket.id) {
	// 			// jugador1.innerHTML = '<img src="../assets/2websockets.png" width="60px" height="60px">'; // Eres el jug2
	// 		}
	// 	}
	// });

	socket.on("actualizarProgreso", function (data) {
		console.log("actualizarProgreso", data.progresoEnemigo);
		if (data.progresoEnemigo) {
			theirInnerProgressBar.setAttribute("value", JSON.stringify(data.progresoEnemigo));
		}
	});
});
