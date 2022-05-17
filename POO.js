class Jugador {
	constructor(nombre, wpm, acc) {
		this.nombre = nombre;
		this.wpm = wpm;
		this.acc = acc;
	}

	getNombre() {
		return this.nombre;
	}

	getWpm() {
		return this.wpm;
	}

	getAcc() {
		return this.acc;
	}

	añadirPuntuaciones() {}
}

module.exports = Jugador;
