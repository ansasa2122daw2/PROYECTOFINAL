//API NO USO AHORA
// const RANDOM_QUOTE = "http://api.quotable.io/random";

// function getRandom() {
// 	return fetch(RANDOM_QUOTE)
// 		.then((response) => response.json())
// 		.then((data) => data.content);
// }
//CARGO LA PAGINA CON INIT
window.addEventListener("load", init);

//tengo los parafos hardcoded
const parafos = [
	"Vida antes que muerte. ¿Qué significaba el dicho? ¿Que los hombres deberían buscar la vida antes que buscar la muerte? Eso era obvio. ¿O significaba otra cosa? ¿Que la vida venía antes que la muerte? Una vez más, obvio. Y sin embargo las palabras sencillas le hablaban. La muerte viene, susurraban. La muerte les viene a todos. Pero la vida viene primero. Saboréala. La muerte es el destino. Pero el viaje, eso es la vida. Eso es lo que importa.",
	"Hay dos tipos de personas en el mundo, hijo -dijo su padre severamente-. Los que salvan vidas. Y los que las quitan. - ¿Y los que protegen y defienden? ¿Los que salvan vidas quitando vidas? Su padre bufó. -Eso es como intentar detener una tormenta soplando más fuerte. Ridículo. No se puede proteger matando.",
	"Me quedé dormido pensando en que Amelia Garayoa, aquella misteriosa antepasada mía, había sido una romántica temperamental, una mujer ansiosa de experiencias, constreñida por las imposiciones sociales de su época; un tanto incauta y desde luego con una clara tendencia a la fascinación por el abismo.",
	"Si el líder dice de tal evento esto no ocurrió, pues no ocurrió. Si dice que dos y dos son cinco, pues dos y dos son cinco. Esta perspectiva me preocupa mucho más que las bombas.",
	"Cada libro, cada volumen que ves aquí, tiene un alma. El alma de la persona que lo escribió y de aquellos que lo leyeron, vivieron y soñaron con él. Cada vez que un libro cambia de manos, cada vez que alguien baja sus ojos a las páginas, su espíritu crece y se fortalece",
	"Rendirse es lo que destruye a la gente, cuando te niegas con todo tu corazón a rendirte entonces trasciendes tu humanidad, incluso ante la muerte nunca te rindas.",
];

const diez = ["hola amigos adiós solo perdón pierna corazón tener láminas importante", "afeitar anillo todos caracol perdonar historia limpiar humano tierra mar"];

let solucion = [];

//DOM
let frases = document.getElementById("randomize");
let input = document.getElementById("input");
let timer = document.getElementById("time");
let solucionDIV = document.getElementById("body");
let texto = document.getElementById("typing-texto");

let dificilB = document.getElementById("dificil");
let normalB = document.getElementById("normal");
let facilB = document.getElementById("facil");
let hideText = document.getElementById("***");

//declaro
const tiempoFijo = 30;
let time = tiempoFijo;
let jugador = true;
const palabras = 0;
//dificultad
var dificultat = { facil: 10, medio: 30, dificil: 60 };
var currentLevel = 30;
var leveltimer = 0;

//eventos
input.addEventListener("input", () => {
	let frasesSpan = frases.querySelectorAll("span");
	//haces split de los valores para compararlos con el parrafo
	let arrayValue = input.value.split("");
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
		//otro timer de la dificultad
		//setInterval(countdownDificultad(), 1000);
	},
	{ once: true }
);

//FUNCIÓN PRINCIPAL
function init() {
	//usar la función muestra
	muestra(parafos);
	//si timer 0 entonces:
	setInterval(check, 50);

	//dificultad on press button
	dificilB.addEventListener("click", function countdownDificultad() {
		//css
		dificilB.style.backgroundColor = "rgb(37, 80, 21)";
		facilB.style.backgroundColor = "black";
		normalB.style.backgroundColor = "black";
		hideText.style.backgroundColor = "black";

		//focus the input when change
		input.focus();
		input.setAttribute("type", "text");

		//nivel change
		leveltimer = dificultat.dificil;
		currentLevel = dificultat.dificil + 1;

		if (currentLevel > 0) {
			currentLevel--;
		}
		if (currentLevel === 0) {
			jugador = false;
		}
		timer.innerHTML = currentLevel;
	});

	normalB.addEventListener("click", function countdownDificultad() {
		//css
		normalB.style.backgroundColor = "rgb(37, 80, 21)";
		facilB.style.backgroundColor = "black";
		dificilB.style.backgroundColor = "black";
		hideText.style.backgroundColor = "black";

		//focus the input when change
		input.focus();
		input.setAttribute("type", "text");

		//nivel change
		leveltimer = dificultat.medio;
		currentLevel = dificultat.medio + 1;

		if (currentLevel > 0) {
			currentLevel--;
		}
		if (currentLevel === 0) {
			jugador = false;
		}
		timer.innerHTML = currentLevel;
	});

	facilB.addEventListener("click", function countdownDificultad() {
		//css
		facilB.style.backgroundColor = "rgb(37, 80, 21)";
		normalB.style.backgroundColor = "black";
		dificilB.style.backgroundColor = "black";
		hideText.style.backgroundColor = "black";

		//focus the input when change
		input.focus();
		input.setAttribute("type", "text");

		//nivel change
		leveltimer = dificultat.facil;
		currentLevel = dificultat.facil + 1;

		if (currentLevel > 0) {
			currentLevel--;
		}
		if (currentLevel === 0) {
			jugador = false;
		}
		timer.innerHTML = currentLevel;
	});

	hideText.addEventListener("click", function countdownDificultad() {
		//css
		hideText.style.backgroundColor = "rgb(37, 80, 21)";
		facilB.style.backgroundColor = "black";
		normalB.style.backgroundColor = "black";
		dificilB.style.backgroundColor = "black";

		//focus the input when change y poner ** al escribir
		input.focus();
		input.setAttribute("type", "password");

		leveltimer = dificultat.medio;
		currentLevel = dificultat.medio + 1;

		if (currentLevel > 0) {
			currentLevel--;
		}
		if (currentLevel === 0) {
			jugador = false;
		}
		timer.innerHTML = currentLevel;
	});
}

function muestra(parafos) {
	const random = Math.floor(Math.random() * parafos.length);
	frases.innerHTML = ""; //parafos[random]
	input.value = null;
	//console.log(parafos[random].split(""));
	solucion = parafos[random];
	//haces split de los parafos para que luego compruebe caracter por caracter
	const prueba = parafos[random].split("").forEach((character) => {
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
let arrayLocalStorage = [];
// let arrayWPMGeneral = [];

function check() {
	if (!jugador && currentLevel === 0) {
		input.disabled = "true";

		let solucionArray = solucion.split(" ");
		let inputArray = input.value.split(" ");
		let palabrasCorrectas = 0;
		let errores = 0;

		for (let i = 0; i < solucionArray.length; i++) {
			if (solucionArray[i] === inputArray[i]) {
				palabrasCorrectas++;
			} else {
				errores++;
			}
		}
		wpm = Math.floor((palabrasCorrectas * 60) / leveltimer).toFixed(0);
		accuracy = Math.floor((palabrasCorrectas / solucionArray.length) * 100).toFixed(2);

		solucionDIV.innerHTML = "WPM:  " + wpm + "<br/>" + "<br/>" + "ACC:  " + accuracy + "%" + "<br/>" + "<br/>" + "PALABRAS: " + solucionArray.length + " - IDIOMA: " + "Castellano" + " - TIEMPO: " + leveltimer + "s";
		solucionDIV.classList.add("solucionDIV");

		//chart js
		const labels = arrayLabel_partida;

		const data = {
			labels: labels,
			datasets: [
				{
					backgroundColor: "rgb(27, 56, 16)",
					borderColor: "rgb(27, 56, 16)",
					data: arrayWPM_Partida,
				},
				{
					backgroundColor: "rgb(255,0,0)",
					borderColor: "rgb(255,0,0)",
					data: arrayErrores_partida,
				},
			],
		};

		const config = {
			type: "line",
			data: data,
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
		const myChart = new Chart(document.getElementById("myChart"), config);

		//otra tabla?

		// arrayWPMGeneral.push(wpm);

		// const labels2 = arrayLabel_partida;

		// const data2 = {
		// 	labels: labels2,
		// 	datasets: [
		// 		{
		// 			backgroundColor: "rgb(27, 56, 16)",
		// 			borderColor: "rgb(27, 56, 16)",
		// 			data: arrayWPMGeneral,
		// 		},
		// 	],
		// };

		// const config2 = {
		// 	type: "line",
		// 	data: data2,
		// 	options: {
		// 		responsive: false,
		// 		maintainAspectRatio: false,
		// 		plugins: {
		// 			legend: false,
		// 		},
		// 		scales: { y: { title: { display: true, text: "WPM" } } },
		// 	},
		// };

		// //para el Chart se muestre
		// const myChart2 = new Chart(document.getElementById("myChart2"), config2);

		//botones bloqueados para que tengas que refrescar la página
		hideText.disabled = true;
		facilB.disabled = true;
		normalB.disabled = true;
		dificilB.disabled = true;

		arrayLocalStorage.push({ vwpm: wpm, vtimer: leveltimer });

		//local storage lo llamo aquí
		almacenar.desar();
	} // solucionDIV.innerHTML = solucion + input.value + palabrasCorrectas
}

//local storage guardar
var almacenar = {
	desar: function () {
		for (let i = 0; i < arrayLocalStorage.length; i++) {
			localStorage.setItem(arrayLocalStorage[i].vwpm, arrayLocalStorage[i].vtimer);
		}
	},
};
