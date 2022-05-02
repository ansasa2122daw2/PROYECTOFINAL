const collection = document.getElementsByClassName("uno");
console.log(collection);

document.addEventListener("keydown", (event) => {
	const keyName = event.key;
	console.log("keydown event\n\n" + "key: " + keyName);

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
	console.log("keyup event\n\n" + "key: " + keyName);

	for (let element of collection) {
		if (keyName === element.id) {
			element.classList.remove("indexColor");
		}
	}
});
