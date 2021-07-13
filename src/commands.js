import { find_available_games, create_pick_message, create_list_message } from './util.js';

export function pick(players) {
    let games = find_available_games(players);
    let game = games[Math.floor(Math.random() * games.length)];
    return create_pick_message(game.name);
}

export function list(players) {
    let games = find_available_games(players)
    return create_list_message(games, players);
}