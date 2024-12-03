import { Pipeline, PipelineExecution, DeployHistory, Snapshot } from '../types/spinnaker';
export declare class GateClient {
    private ws;
    private baseUrl;
    constructor(baseUrl: string);
    listPipelines(application: string): Promise<Pipeline[]>;
    getPipeline(application: string, pipelineId: string): Promise<Pipeline>;
    executePipeline(application: string, pipelineId: string, params?: Record<string, any>): Promise<string>;
    cancelPipeline(executionId: string): Promise<void>;
    pausePipeline(executionId: string): Promise<void>;
    getDeployHistory(filters?: {
        application?: string;
        environment?: string;
        sha?: string;
        branch?: string;
    }): Promise<DeployHistory[]>;
    getLastDeploy(environment: string, application: string): Promise<DeployHistory>;
    getSnapshots(application: string): Promise<Snapshot[]>;
    getSnapshotByDetails(application: string, sha: string, branch: string): Promise<Snapshot>;
    executePipelineFromSnapshot(application: string, pipelineId: string, snapshotId: string): Promise<string>;
    watchPipelineExecution(executionId: string, onUpdate: (execution: PipelineExecution) => void): void;
    getPipelineExecutionDetails(executionId: string): Promise<PipelineExecution>;
}
