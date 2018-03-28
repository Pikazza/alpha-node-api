'use strict';

const scriptController = require('../Controllers/ScriptController');

module.exports = function(router){

	router.get('/v1.0/script',
		scriptController.getAll),

	router.get('/v1.0/script/:scriptId',
		scriptController.getByScriptId)

	router.post('/v1.0/script',
		scriptController.post),

	router.get('/v1.0/email/:scriptId',
		scriptController.email),

	router.get('/v1.0/emailAll',
		scriptController.emailAll),

	router.put('/v1.0/script/:scriptId',
		scriptController.put )

}