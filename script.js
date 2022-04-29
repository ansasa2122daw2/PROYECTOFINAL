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

//DOM
let frases = document.getElementById("randomize");
let input = document.getElementById("input");
let timer = document.getElementById("time");
let solucionDIV = document.getElementById("body");
let texto = document.getElementById("typing-texto");

let dificilB = document.getElementById("dificil");
let normalB = document.getElementById("normal");
let facilB = document.getElementById("facil");

//declaro
let time = 30; //luego no usaré este
let jugador = true;
const palabras = 0;
// let dificultat = [(facil = 10), (medio = 30), (dificil = 60)];

// const currentLevel = 0;

// //dificultat
// dificilB.addEventListener("onpress", () => {
// 	return (currentLevel = 10);
// });

//eventos
input.addEventListener("input", () => {
	let frasesSpan = frases.querySelectorAll("span");
	//haces split de los valores para compararlos con el parrafo
	let arrayValue = input.value.split("");
	frasesSpan.forEach((characterS, index) => {
		let character = arrayValue[index];
		//borrar si no sirve de nada xd
		character.length++;
		console.log(character);
		if (character[index] === undefined) {
			characterS.classList.remove("incorrect");
			characterS.classList.remove("correct");
		}
		if (character === characterS.innerText) {
			characterS.classList.add("correct");
			characterS.classList.remove("incorrect");
			//borrar si no sirve de nada xd
			console.log("BIEN" + character.length);
			console.log("BIEN" + character);
		} else {
			characterS.classList.add("incorrect");
			characterS.classList.remove("correct");
			//borrar si no sirve de nada xd
			console.log("ERROR" + character.length);
			console.log("ERROR" + character);
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

function init() {
	//usar la función muestra
	muestra(parafos);
	//si timer 0 entonces:
	setInterval(check, 50);
}

//contar las palabras
// function countChars(obj) {
// 	let obj1 = obj.value.length;
// }

function muestra(parafos) {
	const random = Math.floor(Math.random() * parafos.length);
	frases.innerHTML = ""; //parafos[random]
	input.value = null;
	console.log(parafos[random].split(""));
	//haces split de los parafos para que luego compruebe caracter por caracter
	const prueba = parafos[random].split("").forEach((character) => {
		const characterS = document.createElement("span");
		characterS.innerText = character;
		frases.appendChild(characterS);
		characterS.classList.add("fuenteparrafo");
	});
}

function countdown() {
	if (time > 0) {
		time--;
	}
	if (time === 0) {
		jugador = false;
		//hacer aqui el calculo de los fallos
	}
	timer.innerHTML = time;
}

function check() {
	if (!jugador && time === 0) {
		input.disabled = "true";

		//acabar y enseñar stats
		//HACER LA GRAFIA IMPORTNATE
		//HACER ESTO->
		let name = "<div>Resultados: </div>";
		let wpm = "<div>WPM: </div>";
		let errores = "<div>Errores: </div>";

		solucionDIV.innerHTML = name + wpm + errores;
	}
}
