'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../Config/sequelDB')

const Graphs = sequelize.define('graphs', {
  graphId: {
    type: Sequelize.INTEGER ,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.STRING
  },
  graphName: {
    type: Sequelize.STRING
  },
  graphType: {
    type: Sequelize.TEXT
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  graphCreatedBy: {
    type: Sequelize.STRING
  },
  graphUpdatedBy: {
    type: Sequelize.STRING
  },
  graphRow: {
    type: Sequelize.STRING
  },
  graphColumn: {
    type: Sequelize.STRING
  }
});

sequelize.sync().then(function() {
    console.log('_________graphs Table created Successfully ');
  }).error(function(error) {
    console.log('Error while creating  graphs Table ', error);
  })

module.exports = {
    Graphs: Graphs
};
