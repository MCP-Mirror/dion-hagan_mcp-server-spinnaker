import WebSocket from 'ws';
import { Pipeline, PipelineExecution, DeployHistory, Snapshot } from '../types/spinnaker.js';

export interface Application {
  name: string;
  description: string;
  pipelines: Pipeline[];
}

export interface Deployment {
  application: string;
  environment: string;
  version: string;
  status: string;
  lastUpdated: string;
}

export class GateClient {
  private ws: WebSocket | null = null;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // New methods for MCP server
  async getApplications(applications: string[]): Promise<Application[]> {
    const appPromises = applications.map(async (appName) => {
      const pipelines = await this.listPipelines(appName);
      const response = await fetch(`${this.baseUrl}/applications/${appName}`);
      const appDetails = await response.json();
      
      return {
        name: appName,
        description: appDetails.description || '',
        pipelines
      };
    });

    return Promise.all(appPromises);
  }

  async getDeployments(applications: string[], environments: string[]): Promise<Deployment[]> {
    const deployments: Deployment[] = [];
    
    for (const app of applications) {
      for (const env of environments) {
        const lastDeploy = await this.getLastDeploy(env, app);
        if (lastDeploy) {
          deployments.push({
            application: app,
            environment: env,
            version: lastDeploy.version,
            status: lastDeploy.status,
            lastUpdated: lastDeploy.timestamp
          });
        }
      }
    }

    return deployments;
  }

  async getPipelines(application: string): Promise<Pipeline[]> {
    return this.listPipelines(application);
  }

  async triggerPipeline(
    application: string,
    pipelineId: string,
    parameters?: Record<string, unknown>
  ): Promise<{ ref: string }> {
    const ref = await this.executePipeline(application, pipelineId, parameters);
    return { ref };
  }

  // Existing methods
  async listPipelines(application: string): Promise<Pipeline[]> {
    const response = await fetch(`${this.baseUrl}/applications/${application}/pipelines`);
    return response.json();
  }

  async getPipeline(application: string, pipelineId: string): Promise<Pipeline> {
    const response = await fetch(`${this.baseUrl}/applications/${application}/pipelines/${pipelineId}`);
    return response.json();
  }

  async executePipeline(application: string, pipelineId: string, params?: Record<string, any>): Promise<string> {
    const response = await fetch(`${this.baseUrl}/pipelines/${application}/${pipelineId}`, {
      method: 'POST',
      body: JSON.stringify(params || {})
    });
    const { ref } = await response.json();
    return ref; // Returns execution ID
  }

  async cancelPipeline(executionId: string): Promise<void> {
    await fetch(`${this.baseUrl}/pipelines/cancel/${executionId}`, {
      method: 'PUT'
    });
  }

  async pausePipeline(executionId: string): Promise<void> {
    await fetch(`${this.baseUrl}/pipelines/pause/${executionId}`, {
      method: 'PUT'
    });
  }

  // Deploy History Operations
  async getDeployHistory(filters?: {
    application?: string,
    environment?: string,
    sha?: string,
    branch?: string
  }): Promise<DeployHistory[]> {
    const queryParams = new URLSearchParams(filters as Record<string, string>);
    const response = await fetch(`${this.baseUrl}/deploy-history?${queryParams}`);
    return response.json();
  }

  async getLastDeploy(environment: string, application: string): Promise<DeployHistory> {
    const history = await this.getDeployHistory({ 
      environment, 
      application 
    });
    return history[0]; // Assuming sorted by date desc
  }

  // Snapshot Operations
  async getSnapshots(application: string): Promise<Snapshot[]> {
    const response = await fetch(`${this.baseUrl}/snapshots/${application}`);
    return response.json();
  }

  async getSnapshotByDetails(application: string, sha: string, branch: string): Promise<Snapshot> {
    const response = await fetch(
      `${this.baseUrl}/snapshots/${application}/${sha}/${branch}`
    );
    return response.json();
  }

  async executePipelineFromSnapshot(
    application: string, 
    pipelineId: string,
    snapshotId: string
  ): Promise<string> {
    const response = await fetch(`${this.baseUrl}/pipelines/${application}/${pipelineId}`, {
      method: 'POST',
      body: JSON.stringify({ snapshotId })
    });
    const { ref } = await response.json();
    return ref;
  }

  // WebSocket for real-time updates
  watchPipelineExecution(executionId: string, onUpdate: (execution: PipelineExecution) => void): void {
    this.ws = new WebSocket(`${this.baseUrl.replace('http', 'ws')}/pipelines/exec/${executionId}`);
    
    this.ws.on('message', (data: string) => {
      const execution = JSON.parse(data);
      onUpdate(execution);
    });
  }

  // Debug helper
  async getPipelineExecutionDetails(executionId: string): Promise<PipelineExecution> {
    const response = await fetch(`${this.baseUrl}/pipelines/execution/${executionId}`);
    return response.json();
  }
}
