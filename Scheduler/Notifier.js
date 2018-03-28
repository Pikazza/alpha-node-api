'use strict';

let cron = require('node-cron');
const _ = require('lodash');
var Props = require('../Util/api-properties');
const scriptService= require('../Services/ScriptService');

let task =cron.schedule('*/1 * * * *', function(){
  console.log('running a task every single minute');
  var date = new Date();
  var hour = d.getHours();
  var minutes = d.getMinutes();

	scriptService.dailyScripts("02.00" ,function (err , result){
	            if (err) {
	                next(err);
	            } 
	            else{
	            res.status(200).json(result);
	            }
	        });
	scriptService.weeklyScripts("02.00" ,function (err , result){
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

task.start();