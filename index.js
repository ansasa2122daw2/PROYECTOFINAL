let que = document.getElementById("q");

document.addEventListener("keydown", (event) => {
	const keyName = event.key;
	console.log(que.id);
	console.log("keydown event\n\n" + "key: " + keyName);

	if (keyName === que.id) {
		que.classList.add("incorrect");
	} else {
		que.classList.remove("incorrect");
	}
});
