// A function to iterate over each item in the collection
function myEach(collection, callback) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            callback(collection[i]);
        }
    } else {
        for (const key in collection) {
            callback(collection[key]);
        }
    }
    return collection;
}

// A function to map each item in the collection to a new value
function myMap(collection, callback) {
    const result = [];
    myEach(collection, item => result.push(callback(item)));
    return result;
}

// A function to reduce the collection to a single value using the callback function
function myReduce(collection, callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : (Array.isArray(collection) ? collection[0] : Object.values(collection)[0]);

    if (Array.isArray(collection)) {
        for (let i = initialValue !== undefined ? 0 : 1; i < collection.length; i++) {
            accumulator = callback(accumulator, collection[i], i, collection);
        }
    } else {
        const keys = Object.keys(collection);
        for (let i = initialValue !== undefined ? 0 : 1; i < keys.length; i++) {
            accumulator = callback(accumulator, collection[keys[i]], keys[i], collection);
        }
    }

    return accumulator;
}

// Example callback function for addition
function sum(accumulator, currentValue) {
    return accumulator + currentValue;
}

// Example usage of myReduce to sum an array of numbers
const numbers = [3, 5, 7];
const total = myReduce(numbers, sum, 0);
console.log(total); // Output should be 15


const myFind = (collection, callback) => {
    for (let i = 0; i < collection.length; i++) {
        if (callback(collection[i])) {
            return collection[i];
        }
    }
    return undefined;
};

const myKeys = (obj) => {
    return Object.keys(obj);
};

const myValues = (obj) => {
    return Object.values(obj);
};

function myFilter(collection, predicate) {
    const result = [];
    myEach(collection, item => {
        if (predicate(item)) {
            result.push(item);
        }
    });
    return result;
}

function mySize(collection) {
    return Array.isArray(collection) ? collection.length : Object.keys(collection).length;
}

function myFirst(array, n = 1) {
    return n === 1 ? array[0] : array.slice(0, n);
}

function myLast(array, n = 1) {
    return n === 1 ? array[array.length - 1] : array.slice(-n);
}

function mySortBy(array, callback) {
    return array.slice().sort((a, b) => {
        const x = callback(a);
        const y = callback(b);
        return x < y ? -1 : x > y ? 1 : 0;
    });
}

function myFlatten(array, shallow = false, result = []) {
    myEach(array, item => {
        if (Array.isArray(item) && !shallow) {
            myFlatten(item, false, result);
        } else {
            result.push(item);
        }
    });
    return result;
}

module.exports = {
    myEach,
    myMap,
    myReduce,
    myFind,
    myFilter,
    mySize,
    myFirst,
    myLast,
    mySortBy,
    myFlatten,
    myKeys,
    myValues,
};