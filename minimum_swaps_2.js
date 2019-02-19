'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
let globalCount = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
    let end = arr.length
    console.log('disordered Array: ' + arr)
    for (let i = 0; i < end; i++) {
        let valueIndex = obtainSwapValues(arr, i)
        if (valueIndex) {
            swapItems(arr, i, valueIndex)
        }
    }
    console.log('ordered Array: ' + arr)
    console.log('global count: ' + globalCount)
    return globalCount
}
function obtainSwapValues(arrayExample, start) {
    let initValue = arrayExample[start];
    let end = arrayExample.length
    let keyStart = null;

    for (let i = start; i < end; i++)  {
        if (initValue > arrayExample[i]) {
            initValue = arrayExample[i]
            keyStart = i
        }
    }
    return  keyStart
}
function swapItems(arrayExample, start, end) {
    let temp = arrayExample[start]
    arrayExample[start] = arrayExample[end]
    arrayExample[end] = temp
    globalCount++
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
