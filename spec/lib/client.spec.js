const Message = require('../../lib/message')
const Parser = require('../../lib/parser')

describe('Library test suite', () => {
    it('Message parsing', () => {
        let msg = `:irc.server.com 005 Test CHANNELLEN=50 NICKLEN=9 TOPICLEN=490 AWAYLEN=127 KICKLEN=400 MODES=5 MAXLIST=beI:50 EXCEPTS=e INVEX=I PENALTY :are supported on this server\r\n`
        let message = new Message(msg)
        expect(message.prefix.nick).toEqual('irc.server.com')
        expect(message.command).toEqual('005')
        expect(message.params.length).toEqual(10)
        expect(message.trailing).toEqual('are supported on this server')
        expect(message.middle).toEqual('Test')
    })

    it('Action message parsing', () => {
        let msg = `:Test!~Test@test.fr PRIVMSG #Test :\x01ACTION is a test\x01\r\n`
        let message = new Message(msg)
        expect(message.prefix.nick).toEqual('Test')
        expect(message.prefix.user).toEqual('~Test')
        expect(message.prefix.host).toEqual('test.fr')
        expect(message.middle).toEqual('#Test')
        expect(message.trailing).toEqual('\x01ACTION is a test\x01')

        let parser = new Parser()
        let cmd = parser.parse(message)
        expect(cmd).toEqual('pubaction')
    })
})