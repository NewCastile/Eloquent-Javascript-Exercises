//FIZZBUZZ

for (let number = 1; number < 101; number++) {
    output = '';
    if (number % 3 == 0) {
        output += 'Fizz';
    }
    if (number % 5 == 0) {
        output += 'Buzz';
    }
    console.log(number, output);
}

//CHESSBOARD
let chess_string = '';

for (let i = 1; i <= 8; i += 1) {

    if (i % 2 == 0) {
        for (let i = 1; i <= 4; i += 1) {
            chess_string += pattern2;
        }
    }

    else {
        for(let i = 1; i <= 4; i += 1) {
            chess_string += pattern1;
        }
    }

    chess_string += '\n';
}


