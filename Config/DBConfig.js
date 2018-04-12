'use strict';

const { Pool, Client } = require('pg')
let logger =require('../Config/Logger');
const Props = require('../Util/api-properties')

const pool = new Pool({
		user: Props.db.user,
		host: Props.db.host,
		database: Props.db.database,
		password: Props.db.password,
		port: Props.db.port,
		max: Props.db.max,
  		idleTimeoutMillis: Props.db.idleTimeoutMillis
})

pool.on('error', (err, client) => {
  logger.info('Postgres connection error', err)
  process.exit(-1)
})

pool.query('SELECT 1')
  .then(res => logger.info(" Postgres connection successful .. on ", Props.db.host,Props.db.database))
  .catch(e => setImmediate(() => { throw e }))

module.exports= pool;