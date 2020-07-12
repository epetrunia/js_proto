'use strict';

function MyArray() {
    if(!new.target) {
        return new MyArray();
    }

    this.length = 0;
}