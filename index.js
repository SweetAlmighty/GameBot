const Discord = require('discord.js');
const commands = require('./src/commands');

const client = new Discord.Client();

exports.parse_message = (message) => {
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');

        return {
            command: args[0],
            arguments: args[1],
        };
    } else {
        return null;
    }
}

exports.on_message = (message) => {
    let response, msg;

    try {
        response = exports.parse_message(message.content);

        switch (response?.command) {
            case 'pick':
                msg = commands.pick(response.arguments ?? 4);
                break;
            case 'list':
                msg = commands.list(response.arguments ?? 2);
                break;
            default:
                msg = 'I do not recognize that command. Try again, scrub.';
                break;
        }
    } catch (error) {
        msg = 'Your princess is in another castle.';
        console.log(error);
    }

    if (response && msg) {
        message.channel.send(msg);
    }
}

exports.init = () => {
    client.on('message', message => {
        exports.on_message(message);
    });

    client.login(process.env.TOKEN);
}

// Run 
exports.init();