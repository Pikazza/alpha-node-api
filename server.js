/*import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'express-jwt';
import logger from './Config/Logger';
import Props from'./Util/api-properties';
import fs from 'fs';
import db from './Config/DBConfig';
import seqdb from './Config/sequelDB';
import notify from'./Scheduler/Notifier';*/

let express=require('express');
let morgan=require('morgan');
let bodyParser=require('body-parser');
let cors=require('cors');
let mongoose=require('mongoose');
let jwt=require('express-jwt');
let logger=require('./Config/Logger');
let Props =require('./Util/api-properties');
let fs=require('fs');
let db=require('./Config/DBConfig');
let seqdb=require('./Config/sequelDB');
//let notify=require('./Scheduler/Notifier');

const app = express();

const router = express.Router();

require('events').EventEmitter.prototype._maxListeners = 100;

app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent', 
{ stream: { write: message => logger.info(message.trim()) }}));
app.use(router);

router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({
	extended: true
}));
router.use(cors());
router.options('*', cors());

require('./Routes/DashBoard')(router);
require('./Routes/ScriptRoute')(router);
require('./Routes/TemplateRoute')(router);
require('./Routes/GraphRoute')(router);
require('./Exceptions/error-middleware')(router);


/*let imgUploadingDir = Props.imageRefPath.uploadPath;
let imgHostingDir = Props.imageRefPath.hostingPath;
if (!fs.existsSync(imgHostingDir)) {
	fs.mkdirSync(imgHostingDir);
}
if (!fs.existsSync(imgUploadingDir)) {
	fs.mkdirSync(imgUploadingDir);
}*/
//router.use(express.static(imgHostingDir));

router.use(express.static(__dirname+'/public'));

process.on('uncaughtException', function(err) {
logger.info( "['uncaughtException'] " + err.stack || err.message );
});

app.listen(8080, () => logger.info('Server is listening on port: 8080'));