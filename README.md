# MCP Server Spinnaker

A Model Context Platform (MCP) server implementation for Spinnaker integrations.

## Development Setup

1. Install dependencies:
```bash
yarn install
```

2. Build the project:
```bash
yarn build
```

3. Start the server:
```bash
yarn start
```

## Project Structure

```
src/
  ├── commands/        # Command implementations
  ├── schemas/         # Zod schemas for validation
  ├── types/          # TypeScript type definitions
  └── utils/          # Utility functions
```

## Features

- Pipeline Management (list, execute, stop, monitor)
- Application Management (list, details)
- Deployment Management (list, status)
- Schema validation for all inputs/outputs
- TypeScript support

## License

MIT License
