import { z } from 'zod';

export function validateInput<T>(schema: z.ZodType<T>, input: unknown): T {
  return schema.parse(input);
}

export function validateOutput<T>(schema: z.ZodType<T>, output: unknown): T {
  return schema.parse(output);
}

export class ValidationError extends Error {
  constructor(message: string, public errors: z.ZodError) {
    super(message);
    this.name = 'ValidationError';
  }
}
