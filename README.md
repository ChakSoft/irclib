# irclib

Library for making IRC clients

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
    1. [Options](#options)
    2. [Events](#events)
    3. [Components](#components)
3. [API Reference](#api-reference)

## Installation

```bash
$ npm install --save irclib
```

## Usage

```javascript
const { Client } = require('irclib')
const options = {
    //... See doc below
}

const client = new Client(options)
client.start()
    .then(() => {
        console.log('Started.')
    })
```

### Options

| Option | Description | Default value | Mandatory |
| ------ | ----------- | ------------- | --------- |
| `host` | IP Address or hostname | N/A | `Yes` |
| `port` | Port | 6667 | `No` |
| `ssl` | SSL engine | `No` | `No` |
| `channels` | List of default join channels | `{}` | `No` |
| `partMessage` | Message when the lib parts from a channel | `[IrcLib] Good Bye.` | `No` |
| `quitMessage` | Message when the lib disconnects from the server | `[IrcLib] Good Bye.` | `No` |
| `password` | Password of the server | `''` | `No` |
| `encoding` | Text encoding | `utf-8` | `No` |
| `version` | Response text of the CTCP version | Version info in the package.json of your application | `No` |
| `user` | User information | N/A | `Yes` |
|   `nickname` | Initial nickname | N/A | `Yes` |
|   `realname` | Real name | N/A | `Yes` |
|   `alternative` | Alternative nickname | Nickname + `_` | `No` |
|   `username` | User name | N/A | `Yes` |
|   `nickserv` | NickServ password if the nickname is registered | N/A | `No` |
| `extra` | Custom application data for this client (must be an object) | `{}` | `No` |
| `debugLevel` | Debug Level code (`error`, `warning`, `info`, `debug`) | `warning` | `No` |

### Events

| Event | Description | Arguments |
| ----- | ----------- | --------- |
| `pubmsg` | Event received when a message is sent to a channel | `(sender, channel, message)` |
| `privmsg` | Event received when a message is sent to the user | `(sender, message)` |
| `pubnotice` | Event received when a notice is sent to a channel | `(sender, channel, notice)` |
| `privnotice` | Event received when a notice is sent to the user | `(sender, notice)` |
| `join` | Event received when an user joins a channel | `(sender, channel)` |
| `part` | Event received when another user parts from a channel | `(sender, channel, partMessage)` |
| `quit` | Event receievd when another user quits | `(sender, channel, quitMessage)` |
| `error` | Event received when the IRC server emits an error | `(error)` |
| `nick` | Event received when an user changes his nickname | `(sender, nickname)` |
| `kick` | Event received when an user is kicked from a channel | `(sender, channel, target, reason = '')` |
| `ping` | Event received on a PING request | `(sender, pingId)` |
| `invite` | Event received when another user invites the user on a channel | `(sender, channel)` |
| `mode` | Event received when a mode is changed | `(sender, mode)` |

There is a complete list of other events [on this page](https://www.alien.net.au/irc/irc2numerics.html).
Every event can be bound by its numeric code or by a short version of the name. Example : `RPL_WELCOME` is bound to the `welcome` event.

### Components

You can use components to make your code clear.

**pubmsg.js**
```javascript
module.exports = (client) => {
    client.on('pubmsg', (sender, channel, message) => {
        console.log(`Message received from ${sender} on ${channel}: ${message}`)
    })
}
```

**index.js**
```javascript
client.component(require('./pubmsg'))
```

## API Reference

### Class `Client`

`on(event, callback)`
    
Registers an event with a callback.
Returns the client to allow event chaning.

`start()`
    
Starts the client by establishing the connection and listening for incoming data.
Returns a [Bluebird](https://github.com/petkaantonov/bluebird) promise.
