//THE SUM OF RANGE
function myRange(start, end, step = 1) {
	let a = [];
	let i = start;

	if (step > 0) {
		while(i <= end){
			a.push(i);
			i += step;
		}
	}

	if (step < 0) {
		while(i >= end){
			a.push(i);
			i += step;
		}
	}

	return a
}

function mySum(numbers){
	s = 0;
	for (let number of numbers) {
		s += number;
	}
	return s
}

console.log(mySum(myRange(1,10)));


//REVERSING AN ARRAY

//This is a pure function.
function reverseArray(array){
	let newArray = []
    for (let i of array) {
    	newArray.unshift(i)
    }
    return newArray
}

//This not.
function reverseArrayInPlace(array){
	i = 0;
	j = array.length -1;

	while (array[i] != array[j]){
		let val = array[i];

		array[i] = array[j];
		array[j] = val;
		i++;
		j--;
	}

	console.log(array);
}


//A LIST

//First try.
function arrayToList(array){
	let list = {value : array[0], rest : null};
	for (let i = 1; i <=  array.length; i++) {
		next = {value : array[i], rest : null};
		list.rest = next;
	}
	return list;
}

//Function to see result.
function arrayToList(array){
	let list = {value : array[0], rest : null};
	next = {value : array[1], rest : null};
	list.rest = next;
	next.rest = {value : array[2], rest : null};
	return list;
}

//Last try.
function arrayToList(array){
	let lastIndex = array.length -1;
	let list = {val : array[lastIndex], rest : null};
	for (let i = array.length - 2; i >= 0; i--) {

		let object = {val : array[i], rest : list};
		list = object;

	}

	return list;
}

//First try.
function listToArray(list){
	let first = list.val;
	let c = list.rest;
	let array = [first];

	while (c != null){
		array.push(c.val);
		c = c.rest;
	}
	return array;
}

function prepend(element, list){
	let newList = {value: element, rest : list};
	return newList;
}

function nth(index, list){

	if (index == 0) { return console.log(list.val);  }
	let counter = 0;
	let element = null;
	let c = list.rest;

	while (counter != index){
		element = c.val;
		c = c.rest;
		counter += 1;
	}

	console.log(element);
}

//Another form of listToArray.

function listToArray(list){
	let array = [];
	for (let node = list; node; node = node.rest) {
		array.push(node.value);
	}
	return array;
}

//Solution to arrayToList.

function arrayToList(array){
	let list =  null;
	for (let i = array.length - 1; i >= 0; i--) {
		list = {val : array[i], rest : list};
	}
	return list;
}


//DEEP COMPARISON
function deepEqual(obj1, obj2){
	let props1 = Object.keys(obj1), props2 = Object.keys(obj2);
	if (props1.length != props2.length){
		console.log('Objects are different');
		return false
	}
	for (let prop of props1){
		if (!props2.includes(prop)) {
			console.log('Objects have different properties');
			return false
		}
		if (obj1[prop] != obj2[prop]){
			console.log('Properties values are different');
			return false
		}
	}
	console.log('Objects are equal');
	return true
}