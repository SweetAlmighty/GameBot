import { pick } from './src/pick.js';
import Discord from 'discord.js'

const client = new Discord.Client();

export function parse_message(message) {
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');

        return {
            command: args.pop(),
            arguments: args.pop() ?? 4,
        };
    } else {
        return null;
    }
}

export function on_message(message) {
    let response = parse_message(message.content);

    if (response) {
        let msg;
        switch (response.command) {
            case 'pick':
                msg = pick(response.arguments);
                break;
            default:
                msg = 'Your princess is in another castle.';
                break;
        }
        
        message.channel.send(msg);
    }
}

export function init() {
    client.on('message', message => {
        on_message(message);
    });

    client.login(process.env.TOKEN);
}

init();