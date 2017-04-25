'use strict'

const joi = require('joi')
const pino = require('pino')

const envVarsSchema = joi.object({
  LOGGER_LEVEL: joi.string()
    .valid(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  }
}

pino.level = config.logger.level
if (!config.logger.enabled) {
  pino.level = 'silent'
}

module.exports = config
