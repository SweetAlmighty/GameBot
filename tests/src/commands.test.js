const mock_values = {
    mock_game: {
        "name": "game",
        "players": 1
    },
    mock_create_pick_message: jest.fn((name) => {
        return "pre: " + name + " :post";
    }),
    mock_create_list_message: jest.fn(games => {
        return "players: " + games.length;
    }),
    mock_find_available_games: jest.fn(() => {
        return [mock_values.mock_game];
    }),
};

jest.mock("../../src/util", () => ({
    create_pick_message: mock_values.mock_create_pick_message,
    create_list_message: mock_values.mock_create_list_message,
    find_available_games: mock_values.mock_find_available_games
}));

const commands = require('../../src/commands');

describe("pick", () => {
    test("Runs a valid scenario for the pick command.", () => {
        const players = 1;
        const picked = commands.pick(players);
        expect(picked).toBe("pre: game :post");
        expect(mock_values.mock_find_available_games).toHaveBeenCalledWith(players);
        expect(mock_values.mock_create_pick_message).toHaveBeenCalledWith(mock_values.mock_game.name);
    });
});

describe("list", () => {
    test("Runs a valid scenario for the list command.", () => {
        const players = 1;
        const listed = commands.list(1);
        expect(listed).toBe("players: " + players);
        expect(mock_values.mock_find_available_games).toHaveBeenCalledWith(players);
        expect(mock_values.mock_create_list_message).toHaveBeenCalledWith([mock_values.mock_game]);
    });
});