'use strict';

const scriptController = require('../Controllers/ScriptController');

module.exports = function(router){

	router.get('/v1.0/script',
		scriptController.getAll),

	router.get('/v1.0/script/:scriptId',
		scriptController.getByScriptId)

	router.post('/v1.0/script',
		scriptController.post),

	router.put('/v1.0/script/:scriptId',
		scriptController.put )

}