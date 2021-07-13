import { readFileSync } from 'fs';

let dir = '';

switch(process.platform) {
    case "win32": dir = './data/'; break;
    case "linux": dir = '/home/ubuntu/GameBot/data/'; break;
    case "darwin": dir = './data/'; break;
}

const { games } = JSON.parse(readFileSync((dir + 'games.json')));
const { messages } = JSON.parse(readFileSync(dir + 'messages.json'));

function find_games(players) {
    let available_games = games.reduce((accumulator, current) => {
        if (current.players >= players) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);

    if (available_games.length == 0)
        return null;

    return available_games;
}

export function create_pick_message(name) {
    let message = messages[Math.floor(Math.random() * messages.length)];
    return message.pre + name + message.post;
}

export function create_list_message(games, players) {
    let message = 'The following games support up to ' + players + ' players:\n';

    games.forEach(game => {
        message += game.name + '\n';
    });

    return message;
}

export function find_available_games(players) {
    let parsedPlayers = parseInt(players);

    if (isNaN(parsedPlayers) || parsedPlayers < 0) {
        parsedPlayers = 1;
    }

    return find_games(Math.min(Math.max(parsedPlayers, 1), 10));
}