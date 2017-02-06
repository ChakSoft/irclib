const { EventEmitter } = require('events')
const { Numeric } = require('./util/constants')

class Parser extends EventEmitter {
    parse(message) {
        if (message.command) {
            let command = message.command.toLowerCase()
            this.emit(command, message.prefix, message.middle, message.params, message.trailing)
            if (Numeric.hasOwnProperty(command)) {
                this.emit(Numeric[command], message.prefix, message.middle, message.params, message.trailing)
            }
        } else {
            throw new Error('Malformed message: command is mandatory.')
        }
    }
}
module.exports = Parser