import { pick } from './src/pick';
import Discord from 'discord.js'

const client = new Discord.Client({
    token: process.env.TOKEN,
    autorun: true
});

let msg = 'Your princess is in another castle.';

export function parse_message(message) {
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');

        return {
            arguments: args.pop(),
            command: args.pop(),
        };
    } else {
        return null;
    }
}

export function on_message(message) {
    let response = parse_message(message.content);

    if (response) {
        switch (response.command) {
            case 'pick':
                msg = pick(response.arguments);
                break;
        }
    }

    message.channel.send(msg);
}

client.on('message', msg => {
    on_message(msg);
});