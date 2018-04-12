   'use strict';
var my = require('yargs').argv;

/*  var date = new Date();
  var hour = date.getHours();
  var minutes = date.getMinutes();*/

function testMethod(one, two, three){
	console.log("First Input"+one);
	console.log("Second Input "+two);

	let a = Number(one);
	let b = Number(two);
	let d= a+ b
	let z=0;
	console.log(" ADD Result "+d );

}

testMethod(my.one, my.two)