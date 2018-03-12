'use strict';

const express = require('express');
const logger = require('../Config/Logger');
const Constants = require('../Util/error-constants'); 
const ScriptNotFoundError = require('../Exceptions/script-not-found-error');

module.exports = (router) => {
    router.use(function(err, req, res, next) {
        let errorRes;
        logger.error(" exception on "+err.name+" because "+err.message);
        if (err instanceof ScriptNotFoundError) {
            errorRes = {
                "code":Constants.SCRIPT_NOT_FOUND_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            return res.status(401).json(errorRes); 
        }else{
            errorRes = {
                "code":Constants.UNKNOWN_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(500).json(errorRes);
            }
    });
}

