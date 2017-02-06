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
```

### Options

| Option | Description | Default value | Mandatory |
| ------ | ----------- | ------------- | --------- |
| `host` | IP Address or hostname | N/A | `Yes` |
| `port` | Port | 6667 | `No` |
| `ssl` | SSL engine | `No` | `No` |
| `channels` | List of default join channels | `[]` | `No` |
| `partMessage` | Message when the lib parts from a channel | `[IrcLib] Good Bye.` | `No` |
| `quitMessage` | Message when the lib disconnects from the server | `[IrcLib] Good Bye.` | `No` |
| `password` | Password of the server | `''` | `No` |
| `encoding` | Text encoding | `utf8` | `No` |
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

| Event | Description |
| ----- | ----------- |
| `pubmsg` | Event received when a message is sent to a channel |
| `privmsg` | Event received when a message is sent to the user |
| `pubnotice` | Event received when a notice is sent to a channel |
| `privnotice` | Event received when a notice is sent to the user |
| `join` | Event received when an user joins a channel |
| `part` | Event received when another user parts from a channel |
| `quit` | Event receievd when another user quits |
| `error` | Event received when the IRC server emits an error |
| `nick` | Event received when an user changes his nickname |
| `kick` | Event received when an user is kicked from a channel |
| `ping` | Event received on a PING request |
| `invite` | Event received when another user invites the user on a channel |
| `mode` | Event received when a mode is changed |

Every event callback takes 4 arguments :

* `sender`: User information of the sender
* `middle`: Middle information of the message
* `params`: Array with other middle information
* `trailing`: Trailing text of the message

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
Returns the client to allow event chaining.

`start()`
    
Starts the client by establishing the connection and listening for incoming data.

`privmsg(target, message)`

Sends a message to a channel or an user identified by `target`.

`notice(target, message)`

Sends a notice to a channel or an user identified by `target`.

`action(target, message)`

Sends a mIRC-styled action message (`/me`) to a channel or a user identified by `target`.

`join(target)`

Sends a join message to enter a channel identified by `target`.

`part(target, message)`

Sends a part message to leave a channel identified by `target` before leaving the channel.

`quit(message)`

Sends a quit message to the server before quitting the network.

`mode(channel, modificators, targets = [])`

Sends a mode message on a `channel` with inline `modificators`, eventually applied to `targets`.
