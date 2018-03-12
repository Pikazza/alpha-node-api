'use strict';

const _ = require('lodash');
const async = require('async');
const logger = require('../Config/Logger');
const connection = require('../Config/DBConfig');
const ScriptNotFoundError= require('../Exceptions/script-not-found-error');
const Script = require('../Models/Scripts').Scripts; 
const Parameters = require('../Models/Parameters').Parameters; 

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

	logger.info(" Posting new script in Service "+ reqScript);
	let newScript;

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