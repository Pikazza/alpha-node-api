'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../Config/sequelDB')

const Parameters = sequelize.define('parameters', {
  paramId: {
    type: Sequelize.INTEGER ,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  paramName: {
    type: Sequelize.STRING
  },
  paramValue: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  paramType: {
    type: Sequelize.STRING
  },
  scriptId: {
    type: Sequelize.INTEGER
  },
  scriptVar: {
    type: Sequelize.STRING
  }
});


sequelize.sync().then(function() {
    console.log('Parameters Table created Successfully');
  }).error(function(error) {
    console.log(' Error while creating Parameters Table \n', error);
  })
  
module.exports = {
    Parameters: Parameters
};