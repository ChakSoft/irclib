class IrcPrefix {
    constructor(raw) {
        this.nick = null
        this.user = null
        this.host = null
        this.parse(raw)
    }

    parse(raw) {
        let i = 0
        let n2o = raw.indexOf('!')
        if (n2o === -1) {
            this.nick = raw
        } else {
            this.nick = raw.substring(i, n2o)
            i = n2o + 1
            let o2h = raw.indexOf('@', i)
            if (o2h === -1) {
                throw new Error('Malformed prefix: an user cannot be used without host')
            }
            this.user = raw.substring(i, o2h)
            this.host = raw.substring(o2h + 1)
        }
    }

    toString() {
        return `[Nick: ${this.nick}][User: ${this.user}][Host: ${this.host}]`
    }
}

class IrcMessage {
    constructor(raw) {
        this.prefix = null
        this.command = null
        this.params = []
        this.middle = null
        this.trailing = null
        this.parse(raw)
    }

    parse(raw) {
        let i = 0
        let _space = 0

        // Check the final CRLF
        if (raw.substring(raw.length - 2) !== '\r\n') {
            throw new Error('Malformed message: Missing final token CRLF')
        }
        raw = raw.substring(0, raw.length - 2)

        if (raw[i] === ':') {
            // There is a prefix
            _space = raw.indexOf(' ', i)
            this.prefix = new IrcPrefix(raw.substring(i + 1, _space))
            i = _space + 1
        }
        _space = raw.indexOf(' ', i)
        this.command = raw.substring(i, _space).toLowerCase()
        if (this.command.indexOf(':') !== -1) {
            throw new Error('Malformed command: character \':\' found.')
        }
        i = _space + 1
        
        while (raw[i] !== ':' && i < raw.length) {
            _space = raw.indexOf(' ', i)
            if (this.middle === null) {
                this.middle = raw.substring(i, _space)
            } else {
                this.params.push(raw.substring(raw.substring(i, _space)))
            }
            i = _space + 1
        }
        if (raw[i] === ':') {
            this.trailing = raw.substring(i + 1)
        }
    }
}

module.exports = IrcMessage
