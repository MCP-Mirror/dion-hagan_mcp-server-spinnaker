interface CommandResult {
  success: boolean;
  data?: any;
  error?: string;
}  

interface Tool {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
}

class BaseServer {
  protected registerTools(tools: any[]): void {
    // Base implementation
  }
}
import { GateClient } from '../clients/GateClient.js';
import type { Application, Deployment } from '../clients/GateClient.js';

interface SpinnakerContext {
  applications: Application[];
  deployments: Deployment[];
}

interface Command {
  name: string;
  parameters: unknown;
}

export class SpinnakerMCPServer extends BaseServer {
  private logger: Console;
  protected port: number;

  constructor(private gateClient: GateClient, private applications: string[], private environments: string[]) {
    super();
    this.logger = console;
    this.port = 3000;
    this.registerTools();
  }

  getImplementation() {
    return {
      name: 'spinnaker-mcp',
      version: '1.1.0',
      displayName: 'Spinnaker MCP Server',
      description: 'MCP server for Spinnaker deployment management'
    };
  }

  async onStart(): Promise<void> {
    this.logger.info(`Spinnaker MCP Server listening on port ${this.port}`);
  }

  async onStop(): Promise<void> {
    this.logger.info('Spinnaker MCP Server stopped');
  }

  getTools(): Tool[] {
    return [
      {
        name: 'get-applications',
        description: 'Get list of Spinnaker applications',
        parameters: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      {
        name: 'get-pipelines',
        description: 'Get pipelines for a specific application',
        parameters: {
          type: 'object',
          properties: {
            application: { type: 'string' }
          },
          required: ['application']  
        }
      },
      {
        name: 'trigger-pipeline',
        description: 'Trigger a pipeline execution',
        parameters: {
          type: 'object',
          properties: {
            application: { type: 'string' },
            pipelineId: { type: 'string' },
            parameters: {
              type: 'object',
              additionalProperties: true
            }
          },
          required: ['application', 'pipelineId']
        }
      }
    ];
  }

  protected registerTools(): void {
    const tools = this.getTools().map(tool => ({
      name: tool.name,
      parameters: tool.parameters,
      handler: async (params: unknown) => {
        return this.executeCommand({ name: tool.name, parameters: params });
      }
    }));
    super.registerTools(tools);
  }

  async getContext(): Promise<SpinnakerContext> {
    const [applications, deployments] = await Promise.all([
      this.gateClient.getApplications(this.applications),
      this.gateClient.getDeployments(this.applications, this.environments)
    ]);

    return { applications, deployments };
  }

  async executeCommand(command: Command): Promise<CommandResult> {
    try {
      switch (command.name) {
        case 'get-applications':
          const apps = await this.gateClient.getApplications(this.applications);
          return { success: true, data: apps };
          
        case 'get-pipelines':
          const { application } = command.parameters as { application: string };
          const pipelines = await this.gateClient.getPipelines(application);
          return { success: true, data: pipelines };

        case 'trigger-pipeline':
          const { application: app, pipelineId, parameters } = command.parameters as {
            application: string,
            pipelineId: string,
            parameters?: Record<string, unknown>
          };
          const execution = await this.gateClient.triggerPipeline(app, pipelineId, parameters);
          return { success: true, data: execution };
          
        default:
          return { success: false, error: `Unknown command: ${command.name}` };
      }
    } catch (error) {
      this.logger.error('Command execution failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
  }
}
