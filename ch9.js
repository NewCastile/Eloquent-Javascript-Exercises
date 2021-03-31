console.log(/\b([01]+b|[\da-f]+h|\d+)\b/.exec("103"));


function whichGroup(string) {
	let patterns = {
		Binary: /\b[01]+b/, 
		Hexadecimal: /[\\da-f]+h/, 
		Decimal: /\d+/
		};

	for (let pattern of patterns){
		try {
			assert (patterns[pattern].test(string), "Pattern Failure");
			console.log(`The number belongs to the ${pattern} Group`);
			break;
		} catch(e){
	
		}
	}
}


let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
	amount = Number(amount) - 1;
	if (amount == 1) { // only one left, remove the 's'
		unit = unit.slice(0, unit.length - 1);
	} else if (amount == 0) {
		amount = "no";
	}
	return amount + " " + unit;
}

console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs


let stock = "lemon: 1, cabbages: 2, and eggs: 101";
function minusOne(match, unit, amount, offset) {
	amount = Number(amount) - 1;
	if (amount == 1) { // only one left, remove the 's'
		unit = unit.slice(0, unit.length - 1);
	} else if (amount == 0) {
		amount = "no";
	}
	console.log(`${offset}`);
	return amount + " " + unit;
}


/*Los valores pasados a la función minusOne vienen dados por el mecanismo de replace
a la hora de trabajar con regexp. Suponiendo que trabaje con el método exec, el primer 
elemento del array regresado tras conseguir un match, será la cadena en general, el
segundo elemento es el match del primer subgrupo y el último elemento es el match del 
segundo subgrupo. Este array es pasado como una lista de argumentos a minusOne.
*/
console.log(stock.replace(/(\w+): (\d+)/g, minusOne));
// → 0
// → 10
// → 27
// → no lemon, 1 cabbage, and 100 eggs

console.log(/(\d{1,2})+(\d)/.exec("12345678"));
// → ["12345678", "7", "8", index: 0, input: "12345678", groups: undefined]

/*El primer grupo (\d)+ debido al operador de repitición + intenta hacer match con la 
cadena tanto como se pueda. Al llegar al número 7 se da cuenta de que puede consumir
toda la cadena al tener la posibilidad de hacer match con 8, sin embargo esto produciría un error(?)
ya que nunca se evaluaría el segundo grupo. Como el primer grupo causa que la próxima parte del patrón
(es decir, el segundo grupo) ""falle"", el matcher se mueve una posición hacia atrás -backtracking- e intenta 
desde ahí.

El resultado es que, y dependiendo del caso también, el valor del match del primer grupo
será modificado a fin de dejar un espacio para asignar valor al segundo grupo.

En el ejemplo anterior el valor de la segunda cadena debió ser "78" por esto dejaría al segundo
grupo sin ser evaluado, el valor correspondiente es recortado a "7" para dar el valor de "8" al
segundo grupo*/


console.log(/(\d{1,3})+(\d)/.exec("123456789"));
// → ["123456789", "78", "9", index: 0, input: "123456789", groups: undefined]

/*En cierta parte el mecanismo del backtracking ayuda a tratar el comportamiento de caracteres de repetición
""codiciosos"", aunque ello conlleva errores*/

function stripComments(code) {
	return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}

console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1 1

/*El resultado debió ser 1 + 1, pero [^]* intenta hacer match con tanto como le sea posible,
consumiendo el segundo bloque por completo. Como esto causa que la siguiente parte del patrón
""falle"" el matcher regresa a los caracteres anteriores, pasando por 1, un espacio, un slash
y llegando hasta el signo *, una vez en esa posición hace match con el final del segundo bloque
de comentarios. Para cambiar este comportamiento y hacer match con cada bloque de comentarios
colocamos un signo ? después del signo *. */

function stripComments(code) {
return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1 + 1

let name = "dea+hl[]rd";
let sentence = "This dea+hl[]rd guy is super annoying.";
let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let regexp = new RegExp("\\b" + escaped + "\\b", "gi");
console.log(sentence.replace(regexp, "_$&_"));
// → This _dea+hl[]rd_ guy is super annoying.


/*Al usar el constructor RegExp, los boundary markers deben ser creados usando dos backslashes
ya que estamos escribiendolos en una cadena normal, no en regexp encerrada en slashes.

Además la función constructura provee compilación en tiempo de ejecución de la regexp. Se usa
el constructor cuando sabemos que el patrón de la regexp estará cambiando, o cuando no sabemos
el patrón y lo obtenemos desde otra fuente, como una user input.*/

function parseINI(string) {
// Start with an object to hold the top-level fields.
	let result = {};
	let section = result;	
	/*En este punto, section y result ""sostienen"" el mismo objeto.
	Esto se mantendrá solo hasta el primer condicional, en donde un cambio
	en cualquiera de los dos afectará al otro. */

	string.split(/\r?\n/).forEach(line => {
		let match;

		if (match = line.match(/^(\w+)=(.*)$/)) {  //Agrega contenido a una sección
			section[match[1]] = match[2];	
		} 

		else if (match = line.match(/^\[(.*)\]$/)) {  //Crea nuevas secciones
			section = result[match[1]] = {};
		} 

		else if (!/^\s*(;.*)?$/.test(line)) {    
			throw new Error("Line '" + line + "' is not valid.");

			/*Si quitaramos el operador (!) la regexp haría match con una línea de comentarios
			en formato INI, pero como estas líneas se ignoran y además cualquier otra escrita
			es inválida agregamos el operador para terminar con los condicionales que hacen 
			cumplir las reglas del formato */
		}
	});
	return result;
}

console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));
// → {name: "Vasilis", address: {city: "Tessaloniki"}}

let name = "dea++-hl[]rd";
let sentence = "This dea+hl[]rd guy is super annoying.";
let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&"); 	// ""$&"" significa el match completo
let regexp = new RegExp("\\b" + escaped + "\\b", "gi");

console.log(escaped);
// → dea\+hl\[]rd

console.log(regexp);
// → /\bdea\+hl\[]rd\b/gi	  {Primer argumento de la función en forma de Regex literal}

console.log(sentence.replace(regexp, "_$&_"));
// → This _dea+hl[]rd_ guy is super annoying.


let name = "dea++-hl[]rd";
let sentence = "This dea++-hl[]rd guy is super annoying.";
let escaped = name.replace(/[\\[.+*?(){|^$]*/g, "\\$&");
let regexp = new RegExp("\\b" + escaped + "\\b", "gi");

console.log(sentence.replace(regexp, "_$&_"));
// → This dea++-hl[]rd guy is super annoying.

let escaped = name.replace(/[\\[.+*?(){|^$]+/g, "\\$&");	//Signo "+" en lugar de "*"
let regexp = new RegExp("\\b" + escaped + "\\b", "gi");

console.log(sentence.replace(regexp, "_$&_"));
// → This _dea++-hl[]rd_ guy is super annoying.


const html =
	`<a class="foo" href="/foo" id="foo">Foo</a>\n` +
	`<A href='/foo' Class="foo">Foo</a>\n` +
	`<a href="/foo">Foo</a>\n` +
	`<a onclick="javascript:alert('foo!')" href="/foo">Foo</a>`;

html.replace(/<a .*?>(.*?)<\/a>/ig, function(m, g1, offset) {
console.log(`<a> tag found at ${offset}. contents: ${g1}`);
});

/* The function you pass to String.prototype.replace receives the following argu‐
   ments in order:
	• The entire matched string (equivalent to $&).
	• The matched groups (if any). There will be as many of these arguments as there
	  are groups.
	• The offset of the match within the original string (a number, kinda like the index of the
	  match).
	• The original string (rarely used). */


//--------------------------------------------------------------------------------------------------------------

//REGEXP GOLF

function verify(regexp, yes, no) {
	if (regexp.source == "...") return ;
	for (let str of yes) if (!regexp.test(str)) {
		console.log(`Failure to match '${str}'`);
	}
	for (let str of no) {
		console.log(`Unexpected match for '${str}'`);
	}
}

let patternList = [
	/ca(r|t)/,
	/pr?op/,
	/ferr(et|y|ari)/,
	/ious\b/,
	/\s[.,:;]/,
	/\w{7,}/,
	/[^(e|E)]/
	];


verify(patternList[0], ["my car", "bad cats"], ["camper", "high art"]);
verify(patternList[1], ["pop culture", "mad props"], ["plop", "prrrrop"]);
verify(patternList[2], ["ferret", "ferry", "ferrari"], ["ferrum", "transfer A"]);
verify(patternList[3], ["how delicious", "spacious room"], ["ruinous", "consciousness"]);
verify(patternList[4], ["bad punctuation ."], ["escape the period"]);
verify(patternList[5], ["Siebenausenddreihundertzweiundzwanzig"], ["no", "three small words"]);
verify(patternList[6], ["red platypus", "wobbling nest"], ["earth bed", "learning ape", "BEET"]);

//QUOTING STYLE

let myText = "'I'm the cook,' he said, 'it is my job.'";
let quotedText = /(\W')|('\W)/g;
myText.replace(quotedText, m => {
	if (/\W/.test(m[0])) {
		return `${m[0]}"` 
	} else if (/\W/.test(m[1])) {
		return `"${m[1]}`
	}
});
// → 'I'm the cook'" he said, "it is my job'"


let quotedText = /(\W)'|'(\W)/g;
myText.replace(quotedText, (m,g1,g2) => {
	if (g1) {
		return `${g1}"`;
	} else if (g2) {
		return `"${g2}`;
	}
});
// → 'I'm the cook", he said, "it is my job."

let quotedText = /(\W)'|'(\W)/g;
myText.replace(quotedText, `$1"$2`);
// → 'I'm the cook", he said, "it is my job."

let quotedText = /^'|(\W)'|'(\W)/g;
myText.replace(quotedText, `$1"$2`);
// → "I'm the cook", he said, "it is my job."

let quotedText = /^'|(\b)'|'(\b)/g;
myText.replace(quotedText, `$1"$2`);
// → "I"m the cook,' he said, "it is my job.'

//NUMBERS AGAIN

let allowedNumbers = ["10", "10.5", "10e10"]


for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
				 "1.3e2", "1E-4", "1e+15"]) {
	if(!number.test(str)) {
		console.log(`Failed to match '${str}'`);
	}
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.",
				 "1f5", "."]) {
	if(number.test(str)) {
		console.log(`Incorrectly accepted '${str}'`);
	}
}

var numbers = /^[+-]?(\d)*\.(\d)*[eE][+-]?(\d)*/;

var numbers= /^(\+||\-)\d*\.(\d+[eE]?[+-]?\d*)?$/;

var numbers = /(^\+||^\-)\d*\.\d+([eE]?[+-]?\d*)/;

var numbers = /(^\+||^\-)\d*(\.\d+([eE][\+\-]\d+)?)?/;

var numbers = /[\+\-]?(\d+\.?|\d*\.\d+(|[eE][+-]?\d*))/;

var numbers = /[+\-]?(\d+\.?\d*|\.\d+)[eE]?[+\-]?/;

var numbers = /[\+\-]?((\d*\.)?\d+|\.\d+)[eE]?[\+\-]?/y;

var numbers = /[\+\-]?((\d*\.)?\d+|\.\d+)/;

var numbers = /^(\+||\-)(\d*\.\d+|\.\d+)[eE]?[\+\-]?\d+$/;

var numbers = /^(\+||\-)((\d+\.?)?\d*|\.\d+)[eE]?[\+\-]?\d*$/;

//SOLUCION
//Problema: Puede hacer match solo con el símbolo + y una cadena como: +e+12
var numbers = /^[\+\-]?((\d+\.?)?\d*|\.\d+)(e[\+\-]?|E[\+\-]?)?\d+$/;

var numbers = /^[\+\-]?(\d+(\.\d*)?|\.\d+)((e[\+\-]?|E[\+\-]?)\d+)?$/;

//SOLUCION
var numbers = /^[\+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/


^[\+\-]?(\d+(\.\d*)?|\.\d+)(e[\+\-]?|E[\+\-]?)?\d+$


