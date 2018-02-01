'use strict';
var crypto = require('crypto');
var Props = require('../util/api-properties');
var salt = "pikazzasecretkeytoencryprtpassword".toString('base64');
const logger = require('../config/logger');

module.exports.uploadImage = (newFileName,  base64Data, next) => {

    console.log("Uploading image starts..");
    var start=base64Data.indexOf("/")+1;
    var end=base64Data.indexOf(";");
    var formDot = "."+base64Data.substr(start,end-start);
    var form= base64Data.substr(start,end-start);
    var toReplace = new RegExp("data:image/"+form+";base64,");
    var base64Data = base64Data.replace(toReplace, "");
    require("fs").writeFileSync(Props.imageRefPath.uploadPath+newFileName+formDot, base64Data, 'base64');
    var path = Props.imageRefPath.host+newFileName+formDot;
    logger.info("upload is completed "+path);
    return path

};

module.exports.encyptAuthToken = (authToken) => { 
  var hmac = crypto.createHmac('sha256', salt);
    return hmac.update(authToken).digest('hex');
}

module.exports.compareAuthToken = (newAuthToken, oldAuthToken) => {
   var passHash = exports.encyptAuthToken(newAuthToken);
   logger.info("old :"+oldAuthToken);
   logger.info("new :"+passHash);
   return oldAuthToken == passHash;
}

module.exports.getValidStartDate = (date) => {
  var startDate = new Date(date);
  if(!startDate || startDate == 'Invalid Date'){
    return startDate=new Date();
  }
  else{
    return startDate; 
  }
};

module.exports.getValidEndDate = (date) => {
  var endDate = new Date(date);
  if(!endDate || endDate == 'Invalid Date'){
    return endDate=new Date();
  }
  else{
    var date = new Date(endDate.setDate(endDate.getDate() + 1));
    return date;
  }
};

module.exports.isValidDate = (date) => {
  var dd = new Date(date);
  if(!dd || dd == 'Invalid Date'){
    return false;
  }
  else{
    return true;
  }
};
