'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .valid(['development', 'test', 'staging', 'production'])
    .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development'
}

module.exports = config
