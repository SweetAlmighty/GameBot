import { readFileSync } from 'fs'

const { games } = JSON.parse(readFileSync('./data/games.json'));
const { messages } = JSON.parse(readFileSync('./data/messages.json'));

export function create_message(name) {
    let message = messages[Math.floor(Math.random() * messages.length)];
    return message.pre + name + message.post;
}

export function find_game(players) {
    let available_games = games.reduce((accumulator, current) => {
        if (current.players >= players) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);

    if (available_games.length == 0)
        return null;

    return available_games[Math.floor(Math.random() * available_games.length)]
}

export function pick(players) {
    let game = null;
    let parsedPlayers = parseInt(players);

    if (isNaN(parsedPlayers) || parsedPlayers < 0) {
        parsedPlayers = 1;
    }

    game = find_game(Math.min(Math.max(parsedPlayers, 1), 10));

    return create_message(game.name);
}