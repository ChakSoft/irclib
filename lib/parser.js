const { EventEmitter } = require('events')
const { Numeric } = require('./util/constants')

const ChannelsIdentifiers = ['@', '&', '#']

class Parser extends EventEmitter {
    isPublicChannel(channel) {
        return ChannelsIdentifiers.indexOf(channel.charAt(0)) !== -1
    }
    isActionMessage(message) {
        return message.substring(0, 7) === '\x01ACTION'
    }
    isVersionMessage(message) {
        return message.substring(0, 8) === '\x01VERSION'
    }
    parse(message) {
        if (message.command) {
            let command = message.command.toLowerCase()
            if (command === 'privmsg') {
                let publicChannel = this.isPublicChannel(message.middle)
                if (this.isActionMessage(message.trailing)) {
                    command = publicChannel ? 'pubaction' : 'privaction'
                } else if (this.isVersionMessage(message.trailing)) {
                    command = 'version'
                } else {
                    command = publicChannel ? 'pubmsg' : 'privmsg'
                }
            }
            this.emit(command, message.prefix, message.middle, message.params, message.trailing)
            if (Numeric.hasOwnProperty(command)) {
                this.emit(Numeric[command], message.prefix, message.middle, message.params, message.trailing)
            }
            return command
        } else {
            throw new Error('Malformed message: command is mandatory.')
        }
    }
}
module.exports = Parser