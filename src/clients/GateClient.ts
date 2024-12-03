import WebSocket from 'ws';
import { Pipeline, PipelineExecution, DeployHistory, Snapshot } from '../types/spinnaker';

export class GateClient {
  private ws: WebSocket | null = null;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Pipeline Operations
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