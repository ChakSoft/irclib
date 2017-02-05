const Net = require('net')

class SimpleConnector {
    constructor(options) {
        this.options = options
        this.connector = new Net.Socket()
    }
    start() {
        return this.connector.connect({
            port: this.options.port,
            host: this.options.host
        }, () => {
        })
    }
}
module.exports = SimpleConnector
