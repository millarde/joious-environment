'use strict'

// load envvars from .env in local development
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ silent: true })
}

const common = require('./common')
const logger = require('./logger')
const mongo = require('./mongo')
const server = require('./server')

module.exports = Object.assign({}, common, server, logger, mongo)
