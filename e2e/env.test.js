import test from 'ava'
const execFile = require('child_process').execFile

test.beforeEach(t => {
  t.context.env = Object.assign({}, process.env)
  t.context.opts = {}
});

test.cb('all valid values provided, should work', t => {
  t.context.env['NODE_ENV']='production'
  t.context.env['PORT']='3000'
  t.context.env['MONGODB_URL']='mongodb://localhost/UserDB'
  // logger config has valid defaults
  t.context.opts['env'] = t.context.env;
  const child = execFile('node', ['index.js'], t.context.opts, (error, stdout, stderr) => {
    t.falsy(error)
    t.end()
  })
})

test.cb('missing NODE_ENV', t => {
  delete t.context.env['NODE_ENV']
  t.context.opts['env'] = t.context.env;
  const child = execFile('node', ['index.js'], t.context.opts, (error, stdout, stderr) => {
    t.true(error instanceof Error, "Didn't get expected Error returned")
    t.regex(error.message, /"NODE_ENV" is required/)
    t.end()
  })
})

test.cb('bad value for NODE_ENV', t => {
  t.context.env['NODE_ENV']='notinservice'
  t.context.opts['env'] = t.context.env;
  const child = execFile('node', ['index.js'], t.context.opts, (error, stdout, stderr) => {
    t.true(error instanceof Error, "Didn't get expected Error returned")
    t.regex(error.message, /"NODE_ENV" must be one of/)
    t.end()
  })
})

test.cb('missing PORT', t => {
  delete t.context.env['PORT']
  t.context.env['NODE_ENV']='test'
  t.context.env['MONGODB_URL']='mongodb://localhost/UserDB'
  t.context.opts['env'] = t.context.env;
  const child = execFile('node', ['index.js'], t.context.opts, (error, stdout, stderr) => {
    t.true(error instanceof Error, "Didn't get expected Error returned")
    t.regex(error.message, /"PORT" is required/)
    t.end()
  })
})

//warning: this test has a dependency on a .env file that should not be checked in
test.cb('missing PORT but picked up from .env since _development_ mode', t => {
  delete t.context.env['PORT']
  t.context.env['NODE_ENV']='development'
  t.context.env['MONGODB_URL']='mongodb://localhost/UserDB'
  t.context.opts['env'] = t.context.env;
  const child = execFile('node', ['index.js'], t.context.opts, (error, stdout, stderr) => {
  //  t.falsy(error)
    t.end(error)
  })
})
