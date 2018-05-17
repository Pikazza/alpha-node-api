'use strict';

const logger = require('../Config/Logger');
const path=require("path");
const ejs = require('ejs');
const fs = require('fs');
const templateService= require('../Services/TemplateService');
const Utils = require('../Util/mail-sender')
var nodemailer = require('nodemailer');

exports.getAll = (req, res, next) => {

    logger.info("Getting All Templates .. ");

    templateService.getAll(function (err , result){
            if (err) {
                next(err);
            } 
            else{
            res.status(200).json(result);
            }
        });
};