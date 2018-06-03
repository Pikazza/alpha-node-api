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
const childProcess = require('child_process');


module.exports.getAll = (limit, page , next) => {
	let offset = limit * (page);
	Script.findAndCountAll({
		 limit: limit,
      	 offset: offset,
      	 $sort: { graphId: 1 },
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
	if(reqScript.scriptImage){
					reqScript.scriptImage=Props.uploadImage("script_"+reqScript.scriptName,productReq.itemImage);
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
	if(reqScript.scriptImage){
				reqScript.scriptImage=Props.uploadImage("product_"+productId,productReq.itemImage);
			}
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
					if(param.paramId){
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
					}
					else{
						Parameters.create(param)
					  	.then(resParam => {
						  console.log('-----------------------New Script Updated'+ JSON.stringify(resParam) );
						});
					}
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
var date = new Date();
console.log("WEEKLY SERVICE starts at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());
	Script.findAll({
		 where: {
			scriptSchuduledType: "WEEKLY",
			scriptScheduledHour: time
		},
		include: [Parameters]
		})
	.then(function(scriptsAll) {
		logger.info("getting all Scripts from Service ")
		async.each(scriptsAll, function(scripts,e){

				let options=[];
				_.forEach(scripts.parameters, function(param,e){
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );

				runScript(scripts.scriptText,options, function (err) {
				    if (err) throw err;
				    console.log('finished running '+ scripts.scriptText);
				    var date = new Date();
					console.log("WEEKLY SERVICE starts at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());

				});


		});

	});

};


module.exports.dailyScripts = (time, next) => {
var date = new Date();
console.log("DAILy SERVICE starts at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());

	Script.findAll({
		 where: {
			scriptSchuduledType: "DAILY",
			scriptScheduledHour: time
		},
		include: [Parameters]
		})
	.then(function(scriptsAll) {
		_.forEach(scriptsAll, function(scripts,e){

				let options=[];
				_.forEach(scripts.parameters, function(param,e){
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );


				runScript(scripts.scriptText,options, function (err) {
				    if (err) throw err;
				    var date = new Date();
					console.log("DAILY SERVICE ends at "+date.getMinutes()+" "+date.getSeconds()+" "+date.getMilliseconds())
				    console.log('finished running '+ scripts.scriptText);
				});


		});

	});

};


function runScript(scriptPath, options,  callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
	var invoked = false;
	var process = childProcess.fork(scriptPath, options );

    //var process = childProcess.fork(scriptPath, ['--FIRST='+5,'--SECOND='+7] );

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    process.on('uncaughtException', callback);


    //process.setMaxListeners(0);
    require('events').EventEmitter.prototype._maxListeners = 100;

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}


module.exports.email = (scriptId, next) => {
var date = new Date();
console.log("_____________________PikazzaEMAIL SERVICE starts at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());

	Script.findOne({
		where: {
			scriptId: scriptId
		},
		 include: [Parameters]
	})
	.then(function(scripts) {
		if(scripts <= 0 ){
			next(new ScriptNotFoundError("No Product items found for given id "+scriptId));
		}

		let options=[];
		_.forEach(scripts.parameters, function(param,e){
			options.push("--"+param.paramName+"="+param.paramValue)
		});
		console.log("Pikazza options  "+options );

		runScriptTest(scripts.scriptText,options, function (err) {
			console.log("------------------");
		    if (err) {throw err;}

		    console.log('finished running '+ scripts.scriptText);
		    var date = new Date();
			console.log("_____________________PikazzaEMAIL SERVICE ends at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());

		});

  	});

};

function runScriptTest(scriptPath, options,  callback) {
	console.log("Pikazza 0");
    // keep track of whether callback has been invoked to prevent multiple invocations
	var invoked = false;
	var process = childProcess.fork(scriptPath, options );

    //var process = childProcess.fork(scriptPath, ['--FIRST='+5,'--SECOND='+7] );

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
    	console.log("Pikazza 1");
        if (invoked){
        	console.log("Pikazza 2");
        	return;
        }
        console.log("Pikazza 3");
        invoked = true;
        console.log("Pikazza 4 "+err);
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) {
        	console.log("Pikazza 5");
        	return;
        }
        invoked = true;
        console.log("Pikazza 6");
        var err = code === 0 ? null : new Error('exit code ' + code);
        console.log("Pikazza 7");
        callback(err);
    });
    var date = new Date();
	console.log("_____________________PikazzaEMAIL SERVICE ends at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());



}
