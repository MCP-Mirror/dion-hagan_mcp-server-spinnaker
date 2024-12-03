import { ParsedCommand } from '../types/protocol.js';
export declare class CommandParser {
    private patterns;
    parseCommand(input: string): ParsedCommand | null;
    suggestCommand(input: string): string[];
}
