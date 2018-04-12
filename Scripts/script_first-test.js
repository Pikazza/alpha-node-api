 'use strict';
var my = require('yargs').argv;

console.log('My prop is: 0 ' + argv.FIRST);
let dd =JSON.parse(my.FIRST);
console.log(dd[0].paramValue);


let a = dd[0].paramValue;
let b = dd[1].paramValue;
let c= a+b;

console.log("Pikazza Added output >>>>> "+c)
