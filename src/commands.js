const utils = require('./util');

exports.pick = (players) => {
    let games = utils.find_available_games(players);
    let game = games[Math.floor(Math.random() * games.length)];
    return utils.create_pick_message(game.name);
}

exports.list = (players) => {
    let games = utils.find_available_games(players);
    return utils.create_list_message(games);
}