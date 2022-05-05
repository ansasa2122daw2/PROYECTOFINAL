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
				for (var i = 0; i < localStorage.length; i++) {
					var fila = taula.insertRow(0);
					//tabla enseñar local storage
					fila.insertCell(0).innerHTML = "<table><thead><tr><th></th><th>Partida " + i + "</th></tr><thead><tr><td>" + localStorage.key(i) + "</td><td>WPM</td></tr><tr><td>" + localStorage.getItem(localStorage.key(i)) + "</td><td>TIEMPO</td></tr></table>";
					// fila.insertCell(0).innerHTML = i + ")";
					// fila.insertCell(1).innerHTML = "WPM: ";
					// fila.insertCell(2).innerHTML = localStorage.key(i);
					// fila.insertCell(3).innerHTML = "TIEMPO: ";
					// fila.insertCell(4).innerHTML = localStorage.getItem(localStorage.key(i));
					// fila.style.fontWeight = "bold";
					fila.style.fontSize = "15px";
					fila.style.fontFamily = "Arial";
					taula.style.marginTop = "10vh";
					taula.style.marginLeft = "60vh";
				}
			}
		},
	};
	//mostrar los valores nada más cargue la página
	almacenar.mostrar();
};
