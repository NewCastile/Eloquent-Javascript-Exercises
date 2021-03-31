
//A VECTOR TYPE
class Vec {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	get length(){
		let dx = this.x - 0;
		let dy = this.y - 0;
		let distance = Math.sqrt(dx**2 + dy**2);

		return distance;
	}

	plus(otherVec){
		if (otherVec instanceof Vec){
			return new Vec(this.x + otherVec.x,
				this.y + otherVec.y);
		} else { return undefined; }
	}

	minus(otherVec){
		if (otherVec instanceof Vec){
			return new Vec(this.x - otherVec.x,
				this.y - otherVec.y);
		} else { return undefined; }
	}


}

//GROUPS
class Group {
	constructor(...elements) {
		this.group = '';
		[...elements].forEach(e => this.group += `|${e}`);
	}

	add(element) {
		if (this.group.indexOf(element) == -1) {
			this.group += `|${element}`;
			return this.group;
		}
	}

	delete(element) {
		if (!(this.group.indexOf(element) == -1)) {
			this.group = this.group.replace(`|${element}`,'');
			return this.group;
		}
	}

	has(element) {
		if (!(this.group.indexOf(element) == -1)) {
			return true;
		}
	}

	static from(iterable) {
		let group = new Group();

		for (let item of iterable) {
			group.add(item);
		}

		return group;
	}
}


//ITERABLE GROUPS
class GroupIterator {
	constructor(groupObject) {
		this.index = 0;
		this.groupElements = groupObject.group.split('|').filter(e => e != '');
	}

	next() {

		if (this.index > this.groupElements.length -1) {
			return {done : true};
		}

		let element = this.groupElements[this.index];
		let result = {value : `|${element}`, done : false};
		this.index++;

		return result;
	}
}

Group.prototype[Symbol.iterator] = function () {
	return new GroupIterator(this);
}

let bands = Group.from(['Pantera','Nirvana','Oshin']);

for (let band of bands) {
	console.log(band);
}


//BORROWING A METHOD
let ages = {
Boris: 39,
Liang: 22,
Júlia: 62,
hasOwnProperty: 21
};

function hasOwnProperty(property) {
	
    if (typeof(this[property]) != 'function') {
        return true;
    } else { return false; }
}


hasOwnProperty.call(ages, 'hasOwnProperty');
// -> true

console.log(Object.prototype.hasOwnProperty.call(ages, "Júlia"));



























































