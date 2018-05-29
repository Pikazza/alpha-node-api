'use strict';

const logger = require('../Config/Logger');
const path=require("path");
const ejs = require('ejs');
const fs = require('fs');
const graphService= require('../Services/GraphService');
const Utils = require('../Util/mail-sender')
var nodemailer = require('nodemailer');

exports.getAll = (req, res, next) => {

    logger.info("Getting All Graphs .. ");
    logger.info("Getting Graphs page limit: "+ req.query.limit);
    logger.info("Getting Graphs page no: "+ req.query.page);
    logger.info("Getting isGraphDataRequired : "+ req.query.isGraphDataRequired);
    logger.info("Getting isGraphCodeRequired: "+ req.query.isGraphCodeRequired);
    logger.info("Getting isGraphConfigRequired: "+ req.query.isGraphConfigRequired);
    logger.info("Getting Graphs page no: "+ req.query.startDate);
    logger.info("Getting Graphs page no: "+ req.query.endDate);
    let request =
    {
      limit:req.query.limit,
      page:req.query.page,
      isGraphDataRequired:req.query.isGraphDataRequired,
      isGraphCodeRequired: req.query.isGraphCodeRequired,
      isGraphConfigRequired:req.query.isGraphConfigRequired,
      startDate:req.query.startDate,
      endDate:req.query.endDate
    }
    graphService.getAll(request, function (err , result){
            if (err) {
                next(err);
            }
            else{
            res.status(200).json(result);
            }
        });
};

exports.getByGraphId = (req, res, next) => {

    logger.info("Getting Graphs by id "+ req.params.graphId);

	graphService.getByGraphId(req.params.graphId, function (err , result){
            if (err) {
                next(err);
            }
            else{
            res.status(200).json(result);
            }
        });
};

exports.post = (req, res, next) => {

    logger.info("Posting new Graphs "+ req.body)

    graphService.post(req.body, function (err , result){
            if (err) {
                next(err);
            }
            else{
            res.status(200).json(result);
            }
        });
};

exports.put = (req, res, next) => {

    logger.info("updating new Graphs for the Id "+ req.params.graphId)

    graphService.put(req.params.graphId, req.body, function (err , result){
            if (err) {
                next(err);
            }
            else{
            res.status(200).json(result);
            }
        });
};

exports.delete = (req, res, next) => {

    logger.info(" deleting existing graph controller "+req.params.graphId)

    graphService.delete(req.params.graphId, function (err , result){
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

    logger.info(" Email service is has  been called "+req.params.GraphId)

    graphService.emailAll( function (err , result){
            if (err) {
                next(err);
            }
            else{
            res.status(200).json(result);
            }
        });
    //res.status(200).json("Pikazza");
};
