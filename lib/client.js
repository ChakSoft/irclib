/**
 * IRC Main Client
 */

const { SimpleConnector } = require('./connectors')
const IrcMessage = require('./message')
const { EventEmitter } = require('events')
const Parser = require('./parser')

class Client extends EventEmitter {
    constructor(options = {}) {
        this.options = options
        this.connector = null
        this.parser = new Parser()

        /** Auto ping response */
        this.parser.on('ping', (middle, args, message) => {
            this.connector.writeRaw(`PONG :${trailing}`)
        })
    }
    start() {
        this.connector = new SimpleConnector(this.options)
        this.connector
            .on('incoming', this.onIncomingData)
            .start()
        return this.parser
    }
    onIncomingData(raw) {
        let message = new IrcMessage(raw)
        this.parser.parse(message)
    }
    privmsg(target, message) {
        this.connector.writeRaw(`PRIVMSG ${target} :${message}`)
    }
    notice(target, message) {
        this.connector.writeRaw(`NOTICE ${target} :${message}`)
    }
    action(target, message) {
        this.connector.writeRaw(`PRIVMSG ${target} :\x01ACTION${message}\x01`)
    }
    join(target) {
        this.connector.writeRaw(`JOIN ${target}`)
    }
    part(target, message) {
        this.connector.writeRaw(`PART ${target} :${message}`)
    }
    quit(message) {
        this.connector.writeRaw(`QUIT :${message}`)
    }
    mode(channel, modificators, targets = []) {
        this.connector.writeRaw(`MODE ${channel} ${modificators.join(' ')} ${targets.join(' ')}`)
    }
}
module.exports = Client
