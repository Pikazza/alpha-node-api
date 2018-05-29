'use strict';

const _ = require('lodash');
const async = require('async');
const logger = require('../Config/Logger');
const connection = require('../Config/DBConfig');
const Utils = require('../Util/api-utils');
const GraphNotFoundError= require('../Exceptions/graph-not-found-error');
const Graph = require('../Models/Graphs').Graphs;
const ejs = require('ejs');
const fs = require('fs');
const Props = require('../Util/api-properties')
const path=require("path");


module.exports.getAll = (request ,next) => {

	console.log("REquest in Impl "+ JSON.stringify(request))
	let offset = request.limit * (request.page);

	Graph.findAndCountAll({
	  limit: request.limit,
      offset: offset,
      $sort: { graphId: 1 }
		})
	.then(function(Graphs) {
		logger.info("getting all Graphs from Service ")
		logger.info("count "+ Graphs.count)
		let htmlContent;
		let allItems;
		if(request.isGraphCodeRequired === "true" ){
			let graphPath = path.join(__dirname + '/../Public/Graph/templates.html');
    		htmlContent = fs.readFileSync(graphPath, 'utf8');
		}
		if(request.isGraphDataRequired === "true"){
				allItems = [
				    {
				        url:[10, 15, 22, 12],
				        keyword:['a', 'b', 'c', 'd'],
				        createdAt:"03/19/2018"
				    },
				    {
				        url:[10, 19, 2, 12],
				        keyword:['a', 'b', 'c', 'd'],
				        createdAt:"03/21/2018"
				    },
				    {
				        url:[10, 15, 22],
				        keyword:['a', 'b', 'c', 'd'],
				        createdAt:"03/22/2018"
				    }
				];
		}

		let output = {
			graphCode:htmlContent,
			graphData:allItems,
			configData: Graphs
		}
	    next(null, output );
  	});

};

module.exports.getByGraphId = (GraphId, next) => {

	Graph.findOne({
		where: {
			graphId: GraphId
		}
	})
	.then(function(Graphs) {
		logger.info("getting all Graphs from Service ")
		if(Graphs <= 0 ){
			next(new GraphNotFoundError("No Graph items found for given id "+GraphId));
		}
	    next(null, Graphs);
  	});

};

module.exports.post = (reqGraph, next) => {
	let newGraph;
	async.series([
	    function (cbl) {
            Graph.create( reqGraph )
				.then(resGraph => {
					  console.log('new Graph Created'+ JSON.stringify(resGraph) );
					  newGraph=resGraph;
					   cbl();
				});
        }],
        function (err, results) {
            if (err) {
                return next(err);
            } else {

                next(null, newGraph);
            }
        }
    );
};

module.exports.put = (GraphId, reqGraph, next) => {

	logger.info(" updating new Graph in Service "+ GraphId);

	logger.info(" updating new Graph in Service "+ JSON.stringify(reqGraph));
	let newGraph;

	async.series([
	    function (cbl) {

	    	Graph.update(reqGraph,
			  	{
			  		where:
			  		{
			  			graphId: GraphId
			  		},
			  		returning: true,
			  		plain: true

			  	})
			  	.then(resGraph => {
				  console.log('Existing Graph Updated'+ JSON.stringify(resGraph) );
				  newGraph = resGraph[1].dataValues;
				   cbl();
				});
        }],
        function (err, results) {
            if (err) {
                return next(err);
            } else {
                next(null, newGraph);
            }
        }
    );
};

module.exports.delete = (GraphId, next) => {

	logger.info(" updating new Graph in Service "+ GraphId);
	let newGraph;

	async.series([
	    function (cbl) {

	    	Graph.destroy(
			  	{
			  		where:
			  		{
			  			graphId: GraphId
			  		}
			  	})
			  	.then(resGraph => {
				  console.log('Existing Graph Updated'+ JSON.stringify(resGraph) );
				  newGraph = {"status":!! resGraph};
				   cbl();
				});
        }],
        function (err, results) {
            if (err) {
                return next(err);
            } else {
                next(null, newGraph);
            }
        }
    );
};


module.exports.emailAll = (next) => {

	Graph.findAll({
		 include: [Parameters]
		})
	.then(function(GraphsAll) {
		logger.info("getting all Graphs from Service ")
		_.forEach(GraphsAll, function(Graphs,e){

				let options=[];
				_.forEach(Graphs.parameters, function(param,e){
					console.log("pika params "+ param.paramValue)
					console.log("pika e "+ e)
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );

				runGraph(Graphs.GraphText,options, function (err) {
				    if (err) throw err;
				    console.log('finished running '+ Graphs.GraphText);
				});

		});

	});

};


module.exports.monthlyGraphs = (time, next) => {

	Graph.findAll({
		 where: {
			GraphSchuduledType: "MONTHLY",
			GraphScheduledHour: time
		},
		include: [Parameters]
		})
	.then(function(GraphsAll) {
		logger.info("getting all Graphs from Service ")
		_.forEach(GraphsAll, function(Graphs,e){

				let options=[];
				_.forEach(Graphs.parameters, function(param,e){
					console.log("pika params "+ param.paramValue)
					console.log("pika e "+ e)
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );

				runGraph(Graphs.GraphText,options, function (err) {
				    if (err) throw err;
				    console.log('finished running '+ Graphs.GraphText);
				});

		});

	});

};

module.exports.weeklyGraphs = (time, next) => {
var date = new Date();
console.log("WEEKLY SERVICE starts at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());
	Graph.findAll({
		 where: {
			GraphSchuduledType: "WEEKLY",
			GraphScheduledHour: time
		},
		include: [Parameters]
		})
	.then(function(GraphsAll) {
		logger.info("getting all Graphs from Service ")
		async.each(GraphsAll, function(Graphs,e){

				let options=[];
				_.forEach(Graphs.parameters, function(param,e){
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );

				runGraph(Graphs.GraphText,options, function (err) {
				    if (err) throw err;
				    console.log('finished running '+ Graphs.GraphText);
				    var date = new Date();
					console.log("WEEKLY SERVICE starts at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());

				});


		});

	});

};


module.exports.dailyGraphs = (time, next) => {
var date = new Date();
console.log("DAILy SERVICE starts at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());

	Graph.findAll({
		 where: {
			GraphSchuduledType: "DAILY",
			GraphScheduledHour: time
		},
		include: [Parameters]
		})
	.then(function(GraphsAll) {
		_.forEach(GraphsAll, function(Graphs,e){

				let options=[];
				_.forEach(Graphs.parameters, function(param,e){
					options.push("--"+param.paramName+"="+param.paramValue)
				});
				console.log("Pikazza options  "+options );


				runGraph(Graphs.GraphText,options, function (err) {
				    if (err) throw err;
				    var date = new Date();
					console.log("DAILY SERVICE ends at "+date.getMinutes()+" "+date.getSeconds()+" "+date.getMilliseconds())
				    console.log('finished running '+ Graphs.GraphText);
				});


		});

	});

};


function runGraph(GraphPath, options,  callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
	var invoked = false;
	var process = childProcess.fork(GraphPath, options );

    //var process = childProcess.fork(GraphPath, ['--FIRST='+5,'--SECOND='+7] );

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


module.exports.email = (GraphId, next) => {
var date = new Date();
console.log("_____________________PikazzaEMAIL SERVICE starts at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());

	Graph.findOne({
		where: {
			GraphId: GraphId
		},
		 include: [Parameters]
	})
	.then(function(Graphs) {
		if(Graphs <= 0 ){
			next(new GraphNotFoundError("No Product items found for given id "+GraphId));
		}

		let options=[];
		_.forEach(Graphs.parameters, function(param,e){
			options.push("--"+param.paramName+"="+param.paramValue)
		});
		console.log("Pikazza options  "+options );

		runGraphTest(Graphs.GraphText,options, function (err) {
			console.log("------------------");
		    if (err) {throw err;}

		    console.log('finished running '+ Graphs.GraphText);
		    var date = new Date();
			console.log("_____________________PikazzaEMAIL SERVICE ends at "+date.getMinutes()+" "+ date.getSeconds()+" "+date.getMilliseconds());

		});

  	});

};

function runGraphTest(GraphPath, options,  callback) {
	console.log("Pikazza 0");
    // keep track of whether callback has been invoked to prevent multiple invocations
	var invoked = false;
	var process = childProcess.fork(GraphPath, options );

    //var process = childProcess.fork(GraphPath, ['--FIRST='+5,'--SECOND='+7] );

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
