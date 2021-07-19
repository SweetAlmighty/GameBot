const mock_on = jest.fn((name, callback) => {
    callback();
});

const mock_send = jest.fn();

const mock_values = {
    mock_pick: jest.fn(args => "msg"),
    mock_list: jest.fn(args => "msg"),
    mock_message: {
        content: "",
        channel: {
            send: mock_send
        }
    },
    mock_on: jest.fn((name, callback) => {
        callback();
    }),
}

jest.mock("../src/commands.js", () => {
    return {
        pick: mock_values.mock_pick,
        list: mock_values.mock_list
    }
});

jest.mock("discord.js", () => ({
    Client: jest.fn(() => {
        return {
            on: mock_on,
            login: jest.fn()
        }
    })
}));

const index = require('../index');

beforeEach(() => {
    jest.clearAllMocks();
})

describe("parse_message", () => {
    test("Tests that a user's command message is parsed correctly.", () => {
        const output = index.parse_message("!pick 1");
        expect(output.command).toBe('pick');
        expect(output.arguments).toBe('1');
    });
    test("Tests that a user's command message is ignored if it isn't preceeded by an '!'.", () => {
        const output = index.parse_message("pick 1");
        expect(output).toBe(null);
    });
});

describe("on_message", () => {
    describe("Pick command", () => {
        let message = { };
        beforeAll(() => {
            Object.assign(message, mock_values.mock_message);
            message.content = "!pick";
        });
        test("Pick command with no arguments.", () => {
            index.on_message(message);
            expect(mock_send).toHaveBeenCalled();
            expect(mock_values.mock_pick).toHaveBeenCalledTimes(1);
        });
        test("Pick command with one arguments.", () => {
            message.content += " 1";
            index.on_message(message);
            expect(mock_send).toHaveBeenCalled();
            expect(mock_values.mock_pick).toHaveBeenCalledTimes(1);
        });
    });
    describe("List command", () => {
        let message = { };
        beforeAll(() => {
            Object.assign(message, mock_values.mock_message);
            message.content = "!list";
        });
        test("List command with no arguments.", () => {
            index.on_message(message);
            expect(mock_send).toHaveBeenCalled();
            expect(mock_values.mock_list).toHaveBeenCalledTimes(1);
        });
        test("List command with one arguments.", () => {
            message.content += " 1";
            index.on_message(message);
            expect(mock_send).toHaveBeenCalled();
            expect(mock_values.mock_list).toHaveBeenCalledTimes(1);
        });
    });

    describe("Misc", () => {
        test("", () => {
            let message = { };
            Object.assign(message, mock_values.mock_message);
            message.content = "!fake";

            index.on_message(message);
            expect(mock_send).toHaveBeenCalled();
        });
        test("", () => {
            index.on_message(null);
            expect(mock_send).not.toHaveBeenCalled();
        });
    });
});