'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../Config/sequelDB')

const Templates = sequelize.define('templates', {
  templateId: {
    type: Sequelize.INTEGER ,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  templateName: {
    type: Sequelize.STRING
  },
  templateScript: {
    type: Sequelize.TEXT
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});


sequelize.sync().then(function() {
    console.log('________Templates Table created Successfully ');
  }).error(function(error) {
    console.log('Error while creating  Templates Table ', error);
  })

module.exports = {
    Templates: Templates
};