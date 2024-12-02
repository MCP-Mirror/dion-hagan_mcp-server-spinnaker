# MCP Server Spinnaker

A Model Context Platform (MCP) server implementation for Spinnaker integrations. This server acts as a middleware between MCP clients (like spm-cli) and Spinnaker's API, providing standardized access to Spinnaker's pipeline, application, and deployment management features.

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Start the server:
```bash
npm start
```

## Project Structure

```
src/
  ├── index.ts          # Server entry point
  ├── routes/           # API route handlers
  ├── services/         # Business logic and external service integrations
  └── types/           # TypeScript type definitions
```

## Configuration

The server requires the following environment variables:

- `PORT`: The port number for the server to listen on
- `MCP_TOKEN`: Authentication token for MCP service
- `SPINNAKER_API_URL`: Base URL of your Spinnaker API
- `SPINNAKER_TOKEN`: Authentication token for Spinnaker API

## Integration with spm-cli

This server is designed to work seamlessly with [spm-cli](https://github.com/dion-hagan/spm-cli) for Spinnaker pipeline management. The server provides the following key functionalities that spm-cli consumes:

### Pipeline Management
- List all pipelines or filter by application
- Execute pipelines with custom parameters
- Monitor pipeline execution status
- Stop running pipelines

### Application Management
- List all applications
- Get detailed application information

### Deployment Management
- List deployments for specific applications
- Monitor deployment status

## API Endpoints

### Pipelines
- `GET /pipelines` - List all pipelines
- `GET /applications/{app}/pipelines` - List application-specific pipelines
- `POST /pipelines/{id}` - Execute a pipeline
- `PUT /pipelines/{id}/cancel` - Stop a running pipeline
- `GET /pipelines/{id}` - Get pipeline status

### Applications
- `GET /applications` - List all applications
- `GET /applications/{name}` - Get application details

### Deployments
- `GET /applications/{app}/serverGroups` - List deployments for an application

## Error Handling

The server implements standardized error handling for common scenarios:
- Authentication errors (401)
- Authorization errors (403)
- Resource not found (404)
- Rate limiting (429)
- Server errors (500)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
