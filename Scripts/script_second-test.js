   'use strict';
var my = require('yargs').argv;

function testMethod(one, two, three){

	console.log("Prabakaran a"+one);
	console.log("Prabakaran a"+two);

	let a = Number(one);
	let b = Number(two);
	let c=a+b;
	let d= c+ Number(three)

	console.log("Prabakaran Testing c "+c);
	console.log("Prabakaran Testing d "+d );

}

testMethod(my.param0, my.param1, my.param2 )