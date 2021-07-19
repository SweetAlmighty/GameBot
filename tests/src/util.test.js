const mock_values = {
    mock_games: {
        "games": [{
            "name": "name",
            "players": "1"
        }]
    },
    mock_messages: {
        "messages": [{
            "pre": "pre:",
            "post": ":post"
        }]
    },
    mock_games_message: 'The following games support your requested number of players:\nname\n'
}

jest.mock("fs", () => ({
    readFileSync: jest.fn(path => 
        JSON.stringify(path.includes('games') ? mock_values.mock_games : mock_values.mock_messages)
    )
}));

const utils = require('../../src/util');

describe("create_pick_message", () => {
    test("Runs a valid scenario for the create_pick_message function.", () => {
        const message = utils.create_pick_message("name");
        expect(message).toBe("pre:name:post");
    });
});

describe("create_list_message", () => {
    test("Runs a valid scenario for the create_list_message function.", () => {
        const message = utils.create_list_message(mock_values.mock_games.games);
        expect(message).toBe(mock_values.mock_games_message);
    });
});

describe("find_available_games", () => {
    test("Runs a valid scenario for the find_available_games function.", () => {
        const games = utils.find_available_games(1);
        expect(games).toEqual(mock_values.mock_games.games);
    });
    test("", () => {
        const games = utils.find_available_games(2);
        expect(games.length).toBe(0);
    });
    test("", () => {
        const games = utils.find_available_games(null);
        expect(games).toEqual(mock_values.mock_games.games);
    });
    test("", () => {
        const os = process.platform;
        process.platform = "linux";

        const games = utils.find_available_games(1);
        expect(games).toEqual(mock_values.mock_games.games);

        process.platform = os;
    });
});