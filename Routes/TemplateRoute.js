'use strict';

const templateController = require('../Controllers/TemplateController');

module.exports = function(router){

	router.get('/v1.0/template',
		templateController.getAll)

}