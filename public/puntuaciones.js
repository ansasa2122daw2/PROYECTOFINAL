//window onload que carga los datos guardados en el local storage
window.onload = function () {
	//puntuaciones localstorage
	var almacenar = {
		taula: document.getElementById("taula"),
		mostrar: function () {
			//si no hay nada guardado en local storage te saltará un mensaje
			if (!localStorage.length) {
				var fila = taula.insertRow(0);
				fila.insertCell(0).innerHTML = "¡No has jugado ninguna partida!";
				//dom editar la fila y la taula
				fila.style.color = "red";
				fila.style.fontWeight = "900";
				fila.style.fontSize = "25px";
				taula.style.marginTop = "19vh";
				taula.style.marginLeft = "80vh";
			} // en cambio si hay algo guardado en local storage te devolverá los valores que hayan guardados
			else {
				let arrayKeys = [];
				let array10 = [];
				let array30 = [];
				let array60 = [];
				for (var i = 0; i < localStorage.length; i++) {
					// var fila = taula.insertRow(0);
					// //tabla enseñar local storage
					// fila.insertCell(0).innerHTML = "<table id='myTable'><thead><tr><th></th><th>Partida " + i + "</th></tr><thead><tr><td>" + localStorage.key(i) + "</td><td>WPM</td></tr><tr><td>" + localStorage.getItem(localStorage.key(i)) + "</td><td>TIEMPO</td></tr></table>";
					// // fila.insertCell(0).innerHTML = i + ")";
					// // fila.insertCell(1).innerHTML = "WPM: ";
					// // fila.insertCell(2).innerHTML = localStorage.key(i);
					// // fila.insertCell(3).innerHTML = "TIEMPO: ";
					// // fila.insertCell(4).innerHTML = localStorage.getItem(localStorage.key(i));
					// // fila.style.fontWeight = "bold";
					// fila.style.fontSize = "15px";
					// fila.style.fontFamily = "Arial";
					// taula.style.marginTop = "10vh";
					// taula.style.marginLeft = "60vh";
					//chart js

					arrayKeys.push(new Date(parseInt(localStorage.key(i))).toLocaleDateString());
					let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
					switch (item.timer) {
						case 10:
							array10.push(item.wpm);
							break;
						case 30:
							array30.push(item.wpm);
							break;
						case 60:
							array60.push(item.wpm);
							break;
						default:
							break;
					}
				}
				const labels = arrayKeys;

				const historicData = {
					labels: labels,
					datasets: [
						{
							backgroundColor: "rgb(27, 56, 16)",
							borderColor: "rgb(27, 56, 16)",
							data: array10,
						},
						{
							backgroundColor: "rgb(255,0,0)",
							borderColor: "rgb(255,0,0)",
							data: array30,
						},
					],
				};

				const historicConfig = {
					type: "line",
					data: historicData,
					options: {
						responsive: false,
						maintainAspectRatio: false,
						plugins: {
							legend: false,
						},
						scales: { y: { title: { display: true, text: "WPM" } } },
					},
				};

				//para el Chart se muestre
				const myChart = new Chart(document.getElementById("myChart2"), historicConfig);
			}
		},
	};
	//mostrar los valores nada más cargue la página
	almacenar.mostrar();
};
