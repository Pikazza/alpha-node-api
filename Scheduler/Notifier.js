'use strict';

let cron = require('node-cron');
const _ = require('lodash');
var Props = require('../Util/api-properties');
const scriptService= require('../Services/ScriptService');

let task =cron.schedule('*/10 * * * * *', function(){

  console.log('running a task every single minute');
  var date = new Date();
  var hour = date.getHours();
  var minutes = date.getMinutes();

	scriptService.dailyScripts("03.00" ,function (err , result){
	            if (err) {
	                next(err);
	            } 
	            else{
	            res.status(200).json(result);
	            }
	        });
	scriptService.weeklyScripts("03.00" ,function (err , result){
		console.log("checking weekly scripts ")
	            if (err) {
	                next(err);
	            } 
	            else{
	            res.status(200).json(result);
	            }
	        });
	scriptService.monthlyScripts("02.00" ,function (err , result){
	            if (err) {
	                next(err);
	            } 
	            else{
	            res.status(200).json(result);
	            }
	        });


});

/*function ss(){
	  console.log('running a task every single minute');
  var date = new Date();
  var hour = date.getHours();
  var minutes = date.getMinutes();

	scriptService.dailyScripts("03.00" ,function (err , result){
	            if (err) {
	                next(err);
	            } 
	            else{
	            res.status(200).json(result);
	            }
	        });
	scriptService.weeklyScripts("03.00" ,function (err , result){
		console.log("checking weekly scripts ")
	            if (err) {
	                next(err);
	            } 
	            else{
	            res.status(200).json(result);
	            }
	        });
	scriptService.monthlyScripts("02.00" ,function (err , result){
	            if (err) {
	                next(err);
	            } 
	            else{
	            res.status(200).json(result);
	            }
	        });

}

ss();*/
task.start();