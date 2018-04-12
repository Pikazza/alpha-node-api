   'use strict';
var my = require('yargs').argv;


function testMethod(one, two, three){
	console.log("Prabakaran a"+one);
	console.log("Prabakaran a"+two);

	let a = Number(one);
	let b = Number(two);
	let d= a+ b

	console.log("Prabakaran Testing d "+d );

}

testMethod(my.one, my.two)