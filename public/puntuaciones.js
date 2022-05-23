//window onload que carga los datos guardados en el local storage
window.onload = function () {
	//get puntuaciones mongo
	$.ajax({
		url: "getPuntuaciones",
		type: "GET",
		success: function (data) {
			for (let i = 0; i < data.length; i++) {
				var fila = taula.insertRow(0);
				fila.insertCell(0).innerHTML = "<div id='tabla'><table><thead><tr><th></th><th> - </th></tr><thead><tr><td>" + data[i].nombre + "</td><td>Nombre</td></tr><tr><td>" + data[i].wpm + "</td><td>WPM</td></tr><tr><td>" + data[i].accuracy + "</td><td>Accuracy</td></tr></table></div>";
			}
		},
	});

	//puntuaciones localstorage
	var almacenar = {
		taula2: document.getElementById("taula2"),
		mostrar: function () {
			//si no hay nada guardado en local storage te saltará un mensaje
			if (!localStorage.length) {
				var fila = taula2.insertRow(0);
				fila.insertCell(0).innerHTML = "<div id='nopartidas'>¡No has jugado ninguna partida!</div>";
				//dom editar la fila y la taula
			} // en cambio si hay algo guardado en local storage te devolverá los valores que hayan guardados
			else {
				let arrayKeys = [];
				let array10 = [];
				let array30 = [];
				let array60 = [];
				for (var i = 0; i < localStorage.length; i++) {
					//se hace el locale date string para pasarlo a date y no se quede así 23823819
					arrayKeys.push(new Date(parseInt(localStorage.key(i))).toLocaleDateString());
					let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
					//switch case para que cuando coincida el timer con el caso entre
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
							label: "TIEMPO 10 SEGUNDOS",
							backgroundColor: "#a34b60",
							borderColor: "#a34b60",
							data: array10,
						},
					],
				};

				const historicConfig = {
					type: "line",
					data: historicData,
					options: {
						responsive: false,
						maintainAspectRatio: false,
						scales: { y: { title: { display: true, text: "WPM" } } },
					},
				};

				//para el Chart se muestre
				const myChart = new Chart(document.getElementById("myChart2"), historicConfig);

				//segunda tabla tiempo 30
				const historicData3 = {
					labels: labels,
					datasets: [
						{
							label: "TIEMPO 30 SEGUNDOS",
							backgroundColor: "#7da34b",
							borderColor: "#7da34b",
							data: array30,
						},
					],
				};

				const historicConfig3 = {
					type: "line",
					data: historicData3,
					options: {
						responsive: false,
						maintainAspectRatio: false,
						scales: { y: { title: { display: true, text: "WPM" } } },
					},
				};

				//para el Chart se muestre
				const myChart3 = new Chart(document.getElementById("myChart3"), historicConfig3);

				//tercera tabla tiempo 60
				const historicData4 = {
					labels: labels,
					datasets: [
						{
							label: "TIEMPO 60 SEGUNDOS",
							backgroundColor: "#bec261",
							borderColor: "#bec261",
							data: array60,
						},
					],
				};

				const historicConfig4 = {
					type: "line",
					data: historicData4,
					options: {
						responsive: false,
						maintainAspectRatio: false,
						scales: { y: { title: { display: true, text: "WPM" } } },
					},
				};

				//para el Chart se muestre
				const myChart4 = new Chart(document.getElementById("myChart4"), historicConfig4);
			}
		},
	};
	//mostrar los valores nada más cargue la página
	almacenar.mostrar();
};
