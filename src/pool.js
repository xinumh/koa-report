const createPuppeteerPool = require('./createPuppeteerPool')
const config = require('./config')

const pool = createPuppeteerPool({
  puppeteerArgs: {
    args: config.browserArgs
  }
})

module.exports = pool