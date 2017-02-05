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
        return new Promise((resolve, reject) => {
            if (this.options.ssl) {
                this.connector = TLS.connect({ 
                    port: this.options.port,
                    host: this.options.host
                 }, () => {
                    resolve()
                })
            } else {
                this.connector = Net.connect({
                    port: this.options.port,
                    host: this.options.host
                }, () => {
                    resolve()
                })                
            }
            this.connector.setEncoding(this.options.encoding)
            this.connector.on('data', (raw) => {
                this.emit('incoming', raw)
            })
        })
    }
}
module.exports = { SimpleConnector }
