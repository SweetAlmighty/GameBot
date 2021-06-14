import { jest } from '@jest/globals'
import { parse_message, on_message } from '../index';

describe("parse_message", () => {
    test("Tests that a user's command message is parsed correctly.", () => {
        let output = parse_message("!pick 1");
        expect(output.command).toBe('pick');
        expect(output.arguments).toBe('1');
    });
    test("Tests that a user's command message is ignored if it isn't preceeded by an '!'.", () => {
        let output = parse_message("pick 1");
        expect(output).toBe(null);
    });
});

describe("on_message", () => {
    test("", () => {
        let send = jest.fn();
        let message = {
            content: "!pick 1",
            channel: {
                send: send
            }
        }
        on_message(message);
        expect(send).toHaveBeenCalled();
    });
});