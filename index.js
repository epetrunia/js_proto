'use strict';

const arr1 = new MyArray();
console.log(`arr1.isMyArray -> ${arr1.isMyArray()}`);

arr1.push(1, 2, 3);
console.log(arr1);

const findElem = arr1.find(el => el > 1);
console.log(`Find element more than 1 -> ${findElem}`);

console.log(`Is arr1 includes 3? ${arr1.includes(3)}`);

console.log(`Make string from arr1 -> ${arr1.join()}`);

const filteredArr = arr1.filter(el => el < 3);
console.log(filteredArr);

const mappedArray = arr1.map(el => el * 2);
console.log(mappedArray);