'use strict';

const _ = require('lodash');
const async = require('async');
const logger = require('../Config/Logger');
const connection = require('../Config/DBConfig');
const Utils = require('../Util/api-utils');
const ScriptNotFoundError= require('../Exceptions/script-not-found-error');
const Templates = require('../Models/Templates').Templates; 
const ejs = require('ejs');
const fs = require('fs');
const nodemailer = require('nodemailer');
const Props = require('../Util/api-properties')
const _eval = require('eval');
const childProcess = require('child_process');


module.exports.getAll = (next) => {

	Templates.findAll({ })
	.then(function(templates) {
		logger.info("getting all Templates from Service ")
	    next(null, templates);
  	});
	
};