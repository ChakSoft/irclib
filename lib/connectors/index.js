const SimpleConnector = require('./net')
const SSLConnector = require('./ssl')

module.exports = {
    createConnector(options) {
        if (options.ssl) {
            // Create an SSL connector
        } else {
            // Create a non-SSL connector
        }
    }
}