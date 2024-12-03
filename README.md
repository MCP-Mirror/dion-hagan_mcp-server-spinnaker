# MCP Server for Spinnaker

This package implements the Model Context Protocol (MCP) for Spinnaker integrations. It provides a server that allows AI assistants to interact with Spinnaker pipelines, deployments, and snapshots through a standardized interface.

## Features

- Full pipeline management (list, execute, pause, cancel)
- Deployment history tracking
- Snapshot management
- Real-time pipeline execution monitoring via WebSocket
- Smart context refresh based on activity levels
- Comprehensive TypeScript type definitions

## Installation

```bash
npm install @airjesus17/mcp-server-spinnaker
# or
yarn add @airjesus17/mcp-server-spinnaker
```

## Usage

### Basic Setup

```typescript
import { ModelContextProtocolServer } from '@airjesus17/mcp-server-spinnaker';

const server = new ModelContextProtocolServer(
  'http://your-gate-url:8084',
  ['your-app-1', 'your-app-2'],
  ['prod', 'staging', 'dev']
);

// Initialize the server
await server.initialize();
```

### Available Commands

The server implements these core operations:

#### Pipeline Operations
- `list-pipelines`: List all pipelines for an application
- `get-pipeline`: Get details of a specific pipeline
- `execute-pipeline`: Start a pipeline execution
- `pause-pipeline`: Pause a running pipeline
- `cancel-pipeline`: Cancel a pipeline execution
- `get-pipeline-execution`: Get detailed execution status

#### Deploy History Operations
- `list-deploys`: List deployment history with optional filters
- `get-last-deploy`: Get most recent deployment for an app/environment

#### Snapshot Operations
- `list-snapshots`: List all snapshots for an application
- `get-snapshot`: Get specific snapshot details
- `deploy-snapshot`: Start a pipeline using a snapshot

### Command Examples

```typescript
// List pipelines
{
  command: 'list-pipelines',
  args: { application: 'my-app' }
}

// Execute pipeline
{
  command: 'execute-pipeline',
  args: {
    application: 'my-app',
    pipelineId: 'deploy-prod',
    params: { version: '1.2.3' }
  }
}

// Get deployment history
{
  command: 'list-deploys',
  args: {
    application: 'my-app',
    environment: 'prod',
    sha: 'abc123',
    branch: 'main'
  }
}
```

### Context Updates

The server maintains context about:
- Active pipeline executions
- Recent deployments by environment
- Active snapshots by application

Context is automatically refreshed based on activity:
- Every 30 seconds when there are active operations
- Every 5 minutes during idle periods

## Development

### Building
```bash
yarn build
```

### Testing
```bash
yarn test
yarn test:coverage
```

### Publishing
```bash
yarn publish
```

## License

MIT