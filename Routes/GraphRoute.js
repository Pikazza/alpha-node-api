'use strict';

const graphController = require('../Controllers/GraphController');

module.exports = function(router){

	router.get('/v1.0/graph',
		graphController.getAll),

	router.get('/v1.0/graph/:graphId',
		graphController.getByGraphId)

	router.post('/v1.0/graph',
		graphController.post),

/*	router.get('/v1.0/email/:GraphId',
		GraphController.email),*/

/*	router.get('/v1.0/emailAll',
		GraphController.emailAll),*/

	router.put('/v1.0/graph/:graphId',
		graphController.put ),

	router.delete('/v1.0/graph/:graphId',
		graphController.delete )

}