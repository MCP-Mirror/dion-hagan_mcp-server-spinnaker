# MCP Server Spinnaker

A Model Context Platform (MCP) server implementation for Spinnaker integrations.

## Installation

```bash
npm install @dion-hagan/mcp-server-spinnaker
# or
yarn add @dion-hagan/mcp-server-spinnaker
```

## Usage

```typescript
import { 
  listApplications, 
  listPipelines, 
  executePipeline 
} from '@dion-hagan/mcp-server-spinnaker';

// Initialize Spinnaker configuration
await initializeSpinnaker({
  apiUrl: 'https://your-spinnaker-api.com',
  token: 'your-token'
});

// List applications
const apps = await listApplications();

// List pipelines for an application
const pipelines = await listPipelines({ application: 'my-app' });

// Execute a pipeline
const execution = await executePipeline({
  name: 'my-pipeline',
  params: { version: '1.0.0' }
});
```

## Development

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
- ES Module support

## License

MIT License
