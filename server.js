import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'express-jwt';
import logger from './Config/Logger';
import Props from'./Util/api-properties';
import fs from 'fs';


const app = express();

const router = express.Router();

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
