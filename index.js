let Discord = require('discord.io')
let games_db = require('./games.json')
let messages_db = require('./messages.json')

let bot = new Discord.Client({
    token: process.env.TOKEN,
    autorun: true
});

function create_message(name) {
    let message = messages_db.messages[Math.floor(Math.random() * messages_db.messages.length)];
    return message.pre + name + message.post;
}

function pick(channelID, players) {
    let game = null;
    let message = null;
    let parsedPlayers = parseInt(players);

    if (isNaN(parsedPlayers) || parsedPlayers < 0) {
        parsedPlayers = 1;
    }

    game = find_game(Math.min(Math.max(parsedPlayers, 1), 10));
    message = create_message(game.name);

    bot.sendMessage({
        to: channelID,
        message: message
    });
}

function find_game(players) {
    let available_games = games_db.games.reduce((accumulator, current) => {
        if (current.players >= players) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);

    if (available_games.length == 0)
        return null;

    return available_games[Math.floor(Math.random() * available_games.length)]
}

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');

        let cmd = args[0];
        args = args.splice(1);

        switch (cmd) {
            case 'pick':
                let players = args[0];
                args = args.splice(1);

                pick(channelID, players)
                break;
        }
    }
});