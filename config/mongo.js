'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  MONGODB_URL: joi.string()
    .regex(/mongodb:\/\/.*/)
    .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  mongo: {
    url: envVars.MONGODB_URL
  }
}

module.exports = config
