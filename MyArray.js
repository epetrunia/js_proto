'use strict';

function MyArray() {

    if (!new.target) {
        return new MyArray();
    }

    this.length = 0;

    this.isMyArray = function isMyArray() {
        return this instanceof MyArray;
    }
}

const myArrProto = new MyArray();
MyArray.prototype = myArrProto;

myArrProto.push = function push() {

    for (let i = 0; i < arguments.length; i++) {
        this[this.length++] = arguments[i];
    }

    return this.length;
}

myArrProto.find = function find(callback) {

    let element;
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            element = this[i];
            break;
        }
    }
    return element;
}

myArrProto.includes = function includes(item, from = 0) {
    if (from < 0) {
        from = this.length + from;
    }
    for (let i = from; i < this.length; i++) {
        if (this[i] === item) {
            return true;
        }
    }
    return false;
}

myArrProto.join = function join(separator = ',') {
    let str = '';
    for (let i = 0; i < this.length - 1; i++) {
        str += String(this[i] + separator);
    }
    str += String(this[this.length - 1]);
    return str;
}

myArrProto.filter = function filter(callback) {
    const filterArray = new MyArray();
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            filterArray.push(this[i]);
        }
    }
    return filterArray;
}

myArrProto.map = function map(callback) {
    const mapArray = new MyArray();
    for (let i = 0; i < this.length; i++) {
        mapArray.push(callback(this[i], i, this));
    }
    return mapArray;
}

myArrProto.reduce = function reduce(callback, initialValue) {
    let counter;
    let accumulator;
    if (initialValue === undefined) {
        counter = 1;
        accumulator = this[0];
    } else {
        counter = 0;
        accumulator = initialValue;
    }

    for (let i = counter; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
}

myArrProto.concat = function concat() {
    const newArr = new this.constructor();

    for (let i = 0; i < this.length; i++) {
        newArr.push(this[i]);
    }

    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof MyArray) {
            for (let j = 0; j < arguments[i].length; j++) {
                newArr.push(arguments[i][j]);
            }
            continue;
        }
        newArr.push(arguments[i]);
    }
    return newArr;
}

myArrProto.flat = function flat(depth = 1) {
    let flatArray = new this.constructor();

    for (let i = 0; i < this.length; i++) {
        flatArray = flatArray.concat(this[i]);
    }
    if (--depth > 0) {
        flatArray = flatArray.flat();
    }
    return flatArray;
}

myArrProto.pop = function pop() {
    const lastElem = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return lastElem;
}