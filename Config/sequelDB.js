'use strict';

const Sequelize = require('sequelize');
let logger =require('../Config/Logger');
const Props = require('../Util/api-properties')

const sequelize = new Sequelize(Props.db.database, Props.db.user, Props.db.password, {
  host: Props.db.host,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: Props.db.max,
    min: 0,
    acquire: 30000,
    idle: Props.db.idleTimeoutMillis
  }
});


sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch(err => {
    logger.info('Unable to connect to the database:', err);
  });

  module.exports= sequelize;