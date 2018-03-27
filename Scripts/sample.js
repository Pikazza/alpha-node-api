'use strict';

let _=require('/home/admin/nodespace/alpha-node-api/node_modules/lodash/lodash.js');

let a= 5;
let b= 10;
let c=a+b;

console.log(" >>>> Pikazza the added values are "+ c);

var val = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

val.forEach( function(entry) { console.log("Pikazza <<<<<<<============== "+ entry);});
_.forEach([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], function(value) {
	console.log("Pikazza <<<<<<< "+ value);
});

