const fs = require('fs');

let dir = '';

switch(process.platform) {
    case "linux": dir = '/home/ubuntu/GameBot/data/'; break;
    default: dir = './data/'; break;
}

const { games } = JSON.parse(fs.readFileSync(dir + 'games.json'));
const { messages } = JSON.parse(fs.readFileSync(dir + 'messages.json'));

function find_games(players) {
    let available_games = games.reduce((accumulator, current) => {
        if (current.players >= players) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);

    if (available_games.length == 0)
        return [];

    return available_games;
}

exports.create_pick_message = name => {
    let message = messages[Math.floor(Math.random() * messages.length)];
    return message.pre + name + message.post;
}

exports.create_list_message = games => {
    let message = 'The following games support your requested number of players:\n';

    games.forEach(game => {
        message += game.name + '\n';
    });

    return message;
}

exports.find_available_games = players => {
    let parsedPlayers = parseInt(players);

    if (isNaN(parsedPlayers) || parsedPlayers < 0) {
        parsedPlayers = 1;
    }

    return find_games(Math.min(Math.max(parsedPlayers, 1), 10));
}