import { z } from 'zod';
export declare function validateInput<T>(schema: z.ZodType<T>, input: unknown): T;
export declare function validateOutput<T>(schema: z.ZodType<T>, output: unknown): T;
export declare class ValidationError extends Error {
    errors: z.ZodError;
    constructor(message: string, errors: z.ZodError);
}
