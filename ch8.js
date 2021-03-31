//RETRY
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(num1, num2) {
	let randomNumber = Math.floor(Math.random()*10);
	if (randomNumber <= 1) {
		return num1 * num2;
	} else {
		throw new MultiplicatorUnitFailure("The operation cannot be done");
	}
}

for(let i = 0; i < 10 ; i++) {
	try {
		let multiplication = primitiveMultiply(3,4);
		console.log(multiplication);
	} catch(e) {
		if (e instanceof MultiplicatorUnitFailure) {
			console.log(e.message);
		} else {
			throw e;
		}
	}
}

//THE LOCKED BOX
class LockError extends Error {}

const box = {
	locked: true,
	unlock() { this.locked = false; },
	lock() { this.locked = true; },
	_content: ["3 Gold Bars", "1 Talismans", "4 Chalices"],
	get content() {
		if (this.locked) throw new LockError("Locked!");
		return this._content;
	}
};

function withBoxUnlocked(aFunction) {
	box.unlock();
	let content = aFunction(box.content);
	return content;
}


try {
	if (box.locked) {
		let boxContent = withBoxUnlocked((array) => array.map(a => ({object: a.slice(2), quantity: a[0]})));	
		box.lock();
		console.log(boxContent);
	} else if (!box.locked) { 
		let boxContent = withBoxUnlocked((array) => array.map(a => ({object: a.slice(2), quantity: a[0]})));	
		console.log(boxContent);		
	}
} catch(e) {
	if (e instanceof LockError) {
		console.log(e.message);
	} else {
		console.log(e.stack);
	}
}