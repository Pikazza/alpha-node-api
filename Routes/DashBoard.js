'use strict';

const dashBoradController = require('../Controllers/DashBoardController');

module.exports = function(router){

	router.get('/v1.0/dashboard',
		dashBoradController.getDashBoard)

}
