const dotenv = require('dotenv')

//env: { parsed: { APP_PORT: '8000' } }
const env = dotenv.config()

module.exports = env.parsed;