import Discord from 'discord.js'
import { pick, list } from './src/commands.js';

const client = new Discord.Client();

export function parse_message(message) {
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

export function on_message(message) {
    let response, msg;

    try {
        response = parse_message(message.content);

        switch (response?.command) {
            case 'pick':
                msg = pick(response.arguments ?? 4);
                break;
            case 'list':
                msg = list(response.arguments ?? 2);
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

export function init() {
    client.on('message', message => {
        on_message(message);
    });

    client.login(process.env.TOKEN);
}

// Run 
init();