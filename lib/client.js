/**
 * IRC Main Client
 */

const { SimpleConnector } = require('./connectors')
const IrcMessage = require('./message')
const { EventEmitter } = require('events')
const Parser = require('./parser')

class Client extends EventEmitter {
    constructor(options = {}) {
        super()
        this.options = options
        this.connector = null
        this.parser = new Parser(this)

        /** Auto ping response */
        this.parser.on('ping', (middle, args, message) => {
            this.connector.writeRaw(`PONG :${trailing}`)
        })
    }
    start() {
        this.connector = new SimpleConnector(this.options)
        this.connector
            .on('incoming', this.onIncomingData.bind(this))
            .on('connect', this.onConnect.bind(this))
            .start()
        return this.parser
    }
    onConnect() {
        if (this.options.password) {
            this.pass(this.options.password)
        }
        this.nick(this.options.user.nickname)
        this.user(this.options.user)
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
        this.connector.close() // Gracefully ends the connection
    }
    mode(channel, modificators, targets = []) {
        this.connector.writeRaw(`MODE ${channel} ${modificators.join(' ')} ${targets.join(' ')}`)
    }
    nick(nickname) {
        this.connector.writeRaw(`NICK :${nickname}`)
    }
    pass(password) {
        this.connector.writeRaw(`PASS :${password}`)
    }
    user(info) {
        this.connector.writeRaw(`USER ${info.username} 0 IRCServer :${this.options.realname}`)
    }
}
module.exports = Client