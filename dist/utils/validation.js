export function validateInput(schema, input) {
    return schema.parse(input);
}
export function validateOutput(schema, output) {
    return schema.parse(output);
}
export class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.errors = errors;
        this.name = 'ValidationError';
    }
}
//# sourceMappingURL=validation.js.map