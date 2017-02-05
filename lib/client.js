/**
 * IRC Main Client
 */

const Promise = require('bluebird')
const { SimpleConnector } = require('./connectors')
const IrcMessage = require('./message')

class Client {
    constructor(options = {}) {
        this.options = options
        this.connector = null
    }
    start() {
        this.connector = new SimpleConnector(this.options)
        this.connector
            .on('incoming', this.onIncomingData)
            .start()
    }
    onIncomingData(raw) {
        let message = new IrcMessage(raw)
    }
}

module.exports = Client
