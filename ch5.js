//FLATTENING
let arrayList = [[11,22], [33,44], [55,66]];

let flat = arrayList.reduce((a, b) => a.concat(b));

console.log(flat);
// -> [11, 22, 33, 44, 55, 66]

//YOUR OWN LOOP
function loop(value, testFunction, bodyFunction, updateFunction){
	for (var i = value; testFunction(i); i = updateFunction(i)) {
		bodyFunction(i);
	}
}

console.log(loop(2, t => t < 256, b => console.log(`new value divided by two is ${b/2}`), u => u *2));
/* -> new value divided by two is 1
	  new value divided by two is 2
	  new value divided by two is 4
	  new value divided by two is 8
	  new value divided by two is 16
	  new value divided by two is 32
	  new value divided by two is 64 */


//EVERYTHING
function every (array, predicateFunction){
	for (let element of array){
		if(!predicateFunction(element)) {
			return false
		}	
	}
	return true
}

console.log(every([4, 6, 16, 36], x => x%2 === 0));
// -> true


console.log(every([4, 9, 16, 36], x => x%2 === 0));
// -> false

function every(array, testFunction){
	array.some(i => testFunction(i));
}

function some(array, testFunction){
	for(let element of array){
		if(testFunction(element)){
			return true
		}
	}
	return false
}

function every(array, testFunction){
	for(let element of array){
		if (!testFunction(element)){
			return false
		}
	}
	return true
}

function some(array, testFunction){
	return array.reduce((a,b) => {return testFunction(a) || testFunction(b)});
}

function every(array, testFunction){
	return array.reduce((a,b) => {return testFunction(a) && testFunction(b)});
}


function every(array, testFunction){
	return !array.some(i => !testFunction(i));
}

//De Morgan's law
function every(array, testFunction){
	return !(array.reduce( (a,b) => {return !testFunction(a) || !testFunction(b)} )) ;
}


//DOMINANT WRITTING DIRECTION
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}


function dominantDirection(text){
	let scripts = countBy(text, char => {
		let script = characterScript(char.codePointAt(0));
		return script? script.direction : 'none';
	})

	scripts = scripts.filter(({direction}) => direction != 'none');

	return scripts.reduce((a, b) =>  {return a.count < b.count? b.name : a.name});
}