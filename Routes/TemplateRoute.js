'use strict';

const scriptController = require('../Controllers/TemplateController');

module.exports = function(router){

	router.get('/v1.0/template',
		scriptController.getAll)

}