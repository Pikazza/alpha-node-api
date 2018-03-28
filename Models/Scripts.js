'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../Config/sequelDB')
const Parameters = require('../Models/Parameters').Parameters; 

const Scripts = sequelize.define('scripts', {
  scriptId: {
    type: Sequelize.INTEGER ,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  scriptName: {
    type: Sequelize.STRING
  },
  scriptText: {
    type: Sequelize.TEXT
  },
  scriptType: {
    type: Sequelize.TEXT
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  scriptCreatedBy: {
    type: Sequelize.STRING
  },
  scriptUpdatedBy: {
    type: Sequelize.STRING
  },
  scriptScheduledHour: {
    type: Sequelize.STRING
  },
  scriptSchuduledType: {
    type: Sequelize.ENUM('WEEKLY', 'MONTHLY', 'DAILY')
  },
  scriptScheduledOn: {
    type: Sequelize.STRING
  }
});


Scripts.hasMany(Parameters, {
  foreignKey: 'scriptId',
  constraints: false,
});

Parameters.belongsTo(Scripts, {
  foreignKey: 'scriptId',
  constraints: false,
  as: 'script'
});

sequelize.sync().then(function() {
    console.log('Scripts Table created Successfully ');
  }).error(function(error) {
    console.log('Error while creating  Scripts Table ', error);
  })

module.exports = {
    Scripts: Scripts
};