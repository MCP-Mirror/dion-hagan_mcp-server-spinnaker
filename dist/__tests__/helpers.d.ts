/// <reference types="jest" />
import { Pipeline, PipelineExecution, DeployHistory, Snapshot } from '../types/spinnaker';
export declare const mockPipeline: Pipeline;
export declare const mockPipelineExecution: PipelineExecution;
export declare const mockDeployHistory: DeployHistory;
export declare const mockSnapshot: Snapshot;
export declare const mockGateClient: {
    listPipelines: jest.Mock<any, any, any>;
    getPipeline: jest.Mock<any, any, any>;
    executePipeline: jest.Mock<any, any, any>;
    cancelPipeline: jest.Mock<any, any, any>;
    pausePipeline: jest.Mock<any, any, any>;
    getPipelineExecutionDetails: jest.Mock<any, any, any>;
    getDeployHistory: jest.Mock<any, any, any>;
    getLastDeploy: jest.Mock<any, any, any>;
    getSnapshots: jest.Mock<any, any, any>;
    getSnapshotByDetails: jest.Mock<any, any, any>;
    executePipelineFromSnapshot: jest.Mock<any, any, any>;
    watchPipelineExecution: jest.Mock<any, any, any>;
};
