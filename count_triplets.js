'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countTriplets function below.
function countTriplets(arr, r) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        let val = evalItemArray(arr, i)
        if (val.length === 1) {
            newArr.push(arr[i])
        } else {
            newArr.push(val)
            i = val[val.length - 1]
        }
    }
    let count = countTruplete(newArr)
    console.log((count[0] * count[1]) - count[1])
    return (count[0] * count[1]) - count[1]
}
function evalItemArray(arr, index) {
    let currentIndex = parseInt(index)
    let subArray = []
    subArray.push(currentIndex)
    while (arr[currentIndex] === arr[currentIndex + 1]) {
        currentIndex++
        subArray.push(currentIndex)
    }
    return subArray
}
function countTruplete(arr) {
    let objectNumbers = 0
    let valueNumbers = 0
    arr.map(x => {
        if (typeof x === "number") {
            valueNumbers++
        } else {
            objectNumbers = objectNumbers + x.length
        }
    })
    return [valueNumbers, objectNumbers]
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
