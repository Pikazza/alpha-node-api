'use strict';

const logger = require('../Config/Logger');
const path=require("path");
const ejs = require('ejs');
const fs = require('fs');
const scriptService= require('../Services/ScriptService');
const Utils = require('../Util/mail-sender')
var nodemailer = require('nodemailer');

exports.getAll = (req, res, next) => {

    logger.info("Getting All Scripts .. ");

    scriptService.getAll(function (err , result){
            if (err) {
                next(err);
            } 
            else{
            res.status(200).json(result);
            }
        });
};

exports.getByScriptId = (req, res, next) => {

    logger.info("Getting Scripts by id "+ req.params.scriptId);

	scriptService.getByScriptId(req.params.scriptId, function (err , result){
            if (err) {
                next(err);
            } 
            else{
            res.status(200).json(result);
            }
        });
};

exports.post = (req, res, next) => {

    logger.info("Posting new Scripts "+ req.body)

    scriptService.post(req.body, function (err , result){
            if (err) {
                next(err);
            } 
            else{
            res.status(200).json(result);
            }
        });
};

exports.put = (req, res, next) => {

    logger.info("updating new Scripts for the Id "+ req.params.scriptId)

    scriptService.put(req.params.scriptId, req.body, function (err , result){
            if (err) {
                next(err);
            } 
            else{
            res.status(200).json(result);
            }
        });
};

exports.email = (req, res, next) => {

    logger.info(" Email service is has  been called "+req.params.scriptId)

    scriptService.email(req.params.scriptId, function (err , result){
            if (err) {
                next(err);
            } 
            else{
            res.status(200).json(result);
            }
        });
    //res.status(200).json("Pikazza");
};

exports.emailAll = (req, res, next) => {

    logger.info(" Email service is has  been called "+req.params.scriptId)

    scriptService.emailAll( function (err , result){
            if (err) {
                next(err);
            } 
            else{
            res.status(200).json(result);
            }
        });
    //res.status(200).json("Pikazza");
};