'use strict';

const _ = require('lodash');
const async = require('async');
const logger = require('../Config/Logger');
const connection = require('../Config/DBConfig');
const Utils = require('../Util/api-utils');
const ScriptNotFoundError= require('../Exceptions/script-not-found-error');
const Script = require('../Models/Scripts').Scripts; 
const Parameters = require('../Models/Parameters').Parameters; 
const ejs = require('ejs');
const fs = require('fs');
const nodemailer = require('nodemailer');
const Props = require('../Util/api-properties')
const _eval = require('eval');
const Threads= require('webworker-threads');
const childProcess = require('child_process');


module.exports.getAll = (next) => {

	Script.findAll({
		 include: [Parameters]
		})
	.then(function(scripts) {
		logger.info("getting all Scripts from Service ")
	    next(null, scripts);
  	});
	
};

module.exports.getByScriptId = (scriptId, next) => {

	Script.findOne({
		where: {
			scriptId: scriptId
		},
		 include: [Parameters]
	})
	.then(function(scripts) {
		logger.info("getting all Scripts from Service ")
		if(scripts <= 0 ){
			next(new ScriptNotFoundError("No Product items found for given id "+scriptId));
		}
	    next(null, scripts);
  	});
	
};

module.exports.post = (reqScript, next) => {

	//logger.info(" Posting new script in Service "+ reqScript);
	let newScript;

	if( reqScript.scriptText != null && reqScript.scriptType=="OWNED"){
		reqScript.scriptText=Utils.saveFile("script_"+reqScript.scriptName,reqScript.scriptText);
		}

	async.series([
	    function (cbl) {
            Script.create(
            	reqScript, 
            	{
               		include: [Parameters]
            	})
				.then(resScript => {
					  console.log('new Script Created'+ JSON.stringify(resScript) );
					  newScript=resScript;
					   cbl();
				});
        }],
        function (err, results) {
            if (err) {
                return next(err);
            } else {

                next(null, newScript);
            }
        }
    );	
};

module.exports.put = (scriptId, reqScript, next) => {

	logger.info(" Posting new script in Service "+ scriptId);
	let newScript;

	async.series([
	    function (cbl) {

	    	Script.update(reqScript,
			  	{
			  		where: 
			  		{ 
			  			scriptId: scriptId 
			  		}
			  	})
			  	.then(resScript => {
				  console.log('Existing Script Updated'+ JSON.stringify(resScript) );
				  console.log("getting size of the parametrs "+reqScript.parameters.length)
				   cbl();
				});
        },
        function (cbl) {
        	console.log("updating all the params");
        	    _.forEach(reqScript.parameters, function(param){
					Parameters.update(param,
						{
					  		where: 
					  		{ 
					  			paramId: param.paramId
					  		}
					  	})
					  	.then(resParam => {
						  console.log('-----------------------Existing Script Updated'+ JSON.stringify(resParam) );
						});
				});
	        console.log("updating all the params completed");
	        cbl();
        },
    	function (cbl) {
    		logger.info("Pikazza put ");
			Script.findOne({
				where: 
				{
					scriptId: scriptId
				},
	 		include: [Parameters]
			})
				.then(function(scripts) {
					logger.info("getting all Scripts from Service ")
					if(scripts <= 0 ){
						next(new ScriptNotFoundError("No Product items found for given id "+scriptId));
					}
				    newScript=scripts;
				    cbl();
			  	});
        }],
        function (err, results) {
            if (err) {
                return next(err);
            } else {
                next(null, newScript);
            }
        }
    );	
};

module.exports.email = (scriptId, next) => {

	Script.findOne({
		where: {
			scriptId: scriptId
		},
		 include: [Parameters]
	})
	.then(function(scripts) {
		logger.info("getting all Scripts from Service ")
		if(scripts <= 0 ){
			next(new ScriptNotFoundError("No Product items found for given id "+scriptId));
		}

		let options=[];
		_.forEach(scripts.parameters, function(param,e){	
			console.log("pika params "+ param.paramValue)
			console.log("pika e "+ e)
			options.push("--"+param.paramName+"="+param.paramValue)
		});
		console.log("Pikazza options  "+options );

		runScript(scripts.scriptText,options, function (err) {
		    if (err) throw err;
		    console.log('finished running '+ scripts.scriptText);
		});

  	});
	
};

module.exports.emailAll = (next) => {

	Script.findAll({
		 include: [Parameters]
		})
	.then(function(scriptsAll) {
		logger.info("getting all Scripts from Service ")
		_.forEach(scriptsAll, function(scripts,e){

				let options=[];
				_.forEach(scripts.parameters, function(param,e){	
					console.log("pika params "+ param.paramValue)
					console.log("pika e "+ e)
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );

				runScript(scripts.scriptText,options, function (err) {
				    if (err) throw err;
				    console.log('finished running '+ scripts.scriptText);
				});

		});

	});
	
};


module.exports.monthlyScripts = (time, next) => {

	Script.findAll({
		 where: {
			scriptSchuduledType: "MONTHLY",
			scriptScheduledHour: time
		},
		include: [Parameters]
		})
	.then(function(scriptsAll) {
		logger.info("getting all Scripts from Service ")
		_.forEach(scriptsAll, function(scripts,e){

				let options=[];
				_.forEach(scripts.parameters, function(param,e){	
					console.log("pika params "+ param.paramValue)
					console.log("pika e "+ e)
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );

				runScript(scripts.scriptText,options, function (err) {
				    if (err) throw err;
				    console.log('finished running '+ scripts.scriptText);
				});

		});

	});
	
};

module.exports.weeklyScripts = (time, next) => {

	Script.findAll({
		 where: {
			scriptSchuduledType: "WEEKLY",
			scriptScheduledHour: time
		},
		include: [Parameters]
		})
	.then(function(scriptsAll) {
		logger.info("getting all Scripts from Service ")
		_.forEach(scriptsAll, function(scripts,e){

				let options=[];
				_.forEach(scripts.parameters, function(param,e){	
					console.log("pika params "+ param.paramValue)
					console.log("pika e "+ e)
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );

				runScript(scripts.scriptText,options, function (err) {
				    if (err) throw err;
				    console.log('finished running '+ scripts.scriptText);
				});

		});

	});
	
};


module.exports.dailyScripts = (time, next) => {

	Script.findAll({
		 where: {
			scriptSchuduledType: "DAILY",
			scriptScheduledHour: time
		},
		include: [Parameters]
		})
	.then(function(scriptsAll) {
		logger.info("getting all Scripts from Service ")
		_.forEach(scriptsAll, function(scripts,e){

				let options=[];
				_.forEach(scripts.parameters, function(param,e){	
					console.log("pika params "+ param.paramValue)
					console.log("pika e "+ e)
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );

				runScript(scripts.scriptText,options, function (err) {
				    if (err) throw err;
				    console.log('finished running '+ scripts.scriptText);
				});

		});

	});
	
};


function runScript(scriptPath, options,  callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
	var invoked = false;

//let pika = JSON.stringify(zza);
	var process = childProcess.fork(scriptPath, options );


    //var process = childProcess.fork(scriptPath, ['--FIRST='+5,'--SECOND='+7] );

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}