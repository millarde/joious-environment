'use strict'

//const http = require('http')
//const promisify = require('es6-promisify') // since I'm using Node 6, is needed?

const config = require('../config')
console.log(process.env)

// const logger = require('pino')
// const app = require('./server')
//
// const server = http.createServer(app.callback())
//
// const serverListen = promisify(server.listen, server)
// serverListen(config.server.port)
//   .then(()=> logger.info(`app is running and listenting on port ${config.server.port}`))
//   .catch((err)=>{
//     logger.error('something when wrong during server start', err)
//     process.exit(1)
//   })
