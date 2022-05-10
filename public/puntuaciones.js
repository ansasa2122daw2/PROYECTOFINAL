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
						plugins: {
							legend: false,
						},
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
						plugins: {
							legend: false,
						},
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
						plugins: {
							legend: false,
						},
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
