const Net = require('net')
const TLS = require('tls')
const Promise = require('bluebird')
const { EventEmitter } = require('events')

class SimpleConnector extends EventEmitter {
    constructor(options) {
        super()
        this.options = options
        this.connector = null
    }
    start() {
        let _module = this.options.ssl ? TLS : Net
        this.connector = _module.connect({ 
            port: this.options.port,
            host: this.options.host
        }, () => {
            this.emit('connect')
        })
        this.connector.setEncoding(this.options.encoding)
        this.connector.on('data', (raw) => {
            this.emit('incoming', raw)
        })
    }
}
module.exports = { SimpleConnector }
