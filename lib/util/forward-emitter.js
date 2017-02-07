const { EventEmitter } = require('events')

class ForwardEmitter extends EventEmitter {
    constructor(forwardTo) {
        super()
        if (forwardTo) {
            this.emit = () => {
                this.emit.apply(this, arguments)
                forwardTo.emit.apply(forwardTo, arguments)
            }
        }
    }
}
module.exports = ForwardEmitter