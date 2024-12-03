# MCP Server for Spinnaker

This package provides a Model Context Protocol (MCP) server implementation for Spinnaker integrations. It allows AI models to interact with Spinnaker deployments, pipelines, and applications through the standardized MCP interface.

## AI Integration

This MCP server is a powerful example of how Anthropic's new AI model, Claude, can directly integrate with and enhance software deployment processes using the Model Context Protocol. By following MCP standards, Claude can access rich contextual information about Spinnaker applications, pipelines, and deployments, and actively manage them using well-defined tools.

Let's dive into some of the exciting possibilities this integration enables for AI-driven CI/CD:

1. **Intelligent Deployment Decisions**: With access to comprehensive context about the state of applications and pipelines, AI models like Claude can analyze this information to make intelligent decisions about when and how to deploy. For example, Claude could look at factors like test coverage, code churn, and historical success rates to determine the optimal time and target environment for a deployment.

2. **Proactive Issue Detection and Autonomous Remediation**: AI models can continuously monitor the CI/CD process, spotting potential issues before they cause problems. Imagine Claude detecting that a new version of a dependency has a known vulnerability and automatically creating a pull request to update it, or noticing that a deployment is taking longer than usual and proactively spinning up additional resources to prevent a timeout.

3. **Continuous Process Optimization**: With each deployment, AI models can learn and adapt, continuously optimizing the CI/CD process. Claude could analyze build and deployment logs to identify bottlenecks, then experiment with different configurations to improve speed and reliability. Over time, the entire deployment process becomes more efficient and robust.

4. **Automated Root Cause Analysis and Recovery**: When issues do occur, AI can rapidly diagnose the problem and even attempt to fix it autonomously. Claude could correlate errors across different parts of the system, identify the most likely root cause, and then take corrective actions like rolling back to a previous version or applying a known patch.

And these are just a few examples! As the Model Context Protocol evolves and more integrations are built, we can expect AI to take on increasingly sophisticated roles in the DevOps world. Across the entire CI/CD pipeline, AI could provide intelligent insights and recommendations, acting as a virtual assistant for product engineers.

By empowering AI to work alongside humans in the CI/CD process, MCP integrations like this Spinnaker server showcase how AI can become a proactive, intelligent partner in Developer Productivity infrastructure. It's a significant step towards more efficient, reliable, and autonomous software delivery.

## Installation

```bash
npm install @airjesus17/mcp-server-spinnaker
```

or

```bash
yarn add @airjesus17/mcp-server-spinnaker
```

## Usage

```typescript
import { SpinnakerMCPServer } from '@airjesus17/mcp-server-spinnaker';

// Initialize the server
const server = new SpinnakerMCPServer(
  'https://your-gate-url',
  ['app1', 'app2'],  // List of applications to monitor
  ['prod', 'staging']  // List of environments to monitor
);

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Spinnaker MCP Server is running on port ${port}`);
});
```

## Available Tools

The server provides the following tools for AI models to interact with Spinnaker:

### get-applications
Retrieves a list of monitored Spinnaker applications and their current state.

```typescript
// Example response
{
  "success": true,
  "data": [
    {
      "name": "myapp",
      "description": "My application",
      "pipelines": [
        {
          "id": "pipeline-1",
          "name": "Deploy to Production",
          "status": "SUCCEEDED"
        }
      ]
    }
  ]
}
```

### get-pipelines
Retrieves all pipelines for a specific application.

```typescript
// Parameters
{
  "application": "myapp"
}

// Example response
{
  "success": true,
  "data": [
    {
      "id": "pipeline-1",
      "name": "Deploy to Production",
      "status": "SUCCEEDED",
      "stages": [...]
    }
  ]
}
```

### trigger-pipeline
Triggers a pipeline execution for a specific application.

```typescript
// Parameters
{
  "application": "myapp",
  "pipelineId": "pipeline-1",
  "parameters": {
    "version": "1.2.3",
    "environment": "production"
  }
}

// Example response
{
  "success": true,
  "data": {
    "ref": "01HFGH2J...",
    "status": "RUNNING"
  }
}
```

## Context Updates

The server automatically maintains context about your Spinnaker deployments. The context includes:

- List of applications and their current state
- Pipeline status for each application
- Current deployments across monitored environments
- Recent pipeline executions

Context is refreshed every 30 seconds by default.

## Environment Variables

The server can be configured using the following environment variables:

- `GATE_URL`: URL of your Spinnaker Gate service
- `MCP_PORT`: Port to run the MCP server on (default: 3000)
- `REFRESH_INTERVAL`: Context refresh interval in seconds (default: 30)

## Types

The package exports TypeScript types for working with the server:

```typescript
import type {
  SpinnakerApplication,
  SpinnakerPipeline,
  SpinnakerDeployment,
  SpinnakerExecution
} from '@airjesus17/mcp-server-spinnaker';
```

## Development

To contribute to the development:

1. Clone the repository
2. Install dependencies: `yarn install`
3. Build the project: `yarn build`
4. Run tests: `yarn test`

## License

MIT License - see [LICENSE](LICENSE) for details.
