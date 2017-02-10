const Message = require('../../lib/message')

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
})