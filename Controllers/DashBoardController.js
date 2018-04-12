'use strict';

const logger = require('../Config/Logger');
const path=require("path");
const ejs = require('ejs');
const fs = require('fs');

exports.getDashBoard = (req, res, next) => {

	logger.info("the current value of query param is "+ req.query.type)

	logger.info("Getting into Dashboard Controller..."+ req.query.type);
	//res.status(200).json("Pikazza");
	if(req.query.type == "TYPE_1"){
			let party= {
		name:'Pikazza',
		mail:'alpha@zza.com',
		pass:'Pikazza'
	};
		let path1 = path.join(__dirname + '/../Public/Templates/type-1.html');
    	let htmlContent = ejs.render(fs.readFileSync(path1, 'utf8'),{party: party});
    	res.end(htmlContent);
	}else if(req.query.type == "TYPE_2"){
			let party= {
		name:'Sathya',
		mail:'alpha@zza.com',
		pass:'Sathya'
	};
		let path2 = path.join(__dirname + '/../Public/Templates/type-2.html');
    	let htmlContent = ejs.render(fs.readFileSync(path2, 'utf8'),{party: party});
    	res.end(htmlContent);

	}else if(req.query.type == "TYPE_3"){

		let path3 = path.join(__dirname + '/../Public/Templates/type-3.html');
    	let htmlContent = ejs.render(fs.readFileSync(path3, 'utf8'),{party: party});
    	res.end(htmlContent);
	}
	else{
		res.sendFile(path.join(__dirname + '/../Public/Templates/index.html'));
		logger.info("Getting store products...");
		
	}
};
