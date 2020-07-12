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
        if (callback(this[i], i, this)){
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