const collection = document.getElementsByClassName("uno");

document.addEventListener("keydown", (event) => {
	const keyName = event.key;

	for (let element of collection) {
		if (keyName === element.id) {
			//para que se ponga rojo al clickar
			element.classList.add("indexColor");
		} else {
			element.classList.remove("indexColor");
		}
	}
});

document.addEventListener("keyup", (event) => {
	const keyName = event.key;

	for (let element of collection) {
		if (keyName === element.id) {
			element.classList.remove("indexColor");
		}
	}
});
