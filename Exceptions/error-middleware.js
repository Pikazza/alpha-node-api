'use strict';

const express = require('express');
const logger = require('../Config/Logger');
const Constants = require('../Util/error-constants'); 


module.exports = (router) => {
    router.use(function(err, req, res, next) {
        let errorRes;
        logger.error(" exception on "+err.name+" because "+err.message);

            errorRes = {
                "code":Constants.UNKNOWN_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(500).json(errorRes);
    });
}

