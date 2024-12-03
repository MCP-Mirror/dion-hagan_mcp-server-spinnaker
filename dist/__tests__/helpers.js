export const mockPipeline = {
    id: 'pipeline-1',
    name: 'Deploy to Production',
    application: 'test-app',
    stages: [
        {
            id: 'stage-1',
            type: 'deploy',
            name: 'Deploy Service',
            refId: 'deploy1',
            requisiteStageRefIds: []
        }
    ],
    status: 'NOT_STARTED'
};
export const mockPipelineExecution = {
    id: 'exec-1',
    pipelineId: 'pipeline-1',
    status: 'RUNNING',
    startTime: Date.now(),
    stages: [
        {
            id: 'stage-1',
            type: 'deploy',
            name: 'Deploy Service',
            refId: 'deploy1',
            requisiteStageRefIds: [],
            status: 'RUNNING',
            startTime: Date.now(),
            context: {}
        }
    ]
};
export const mockDeployHistory = {
    id: 'deploy-1',
    environment: 'prod',
    snapshot_id: 'snap-1',
    application: 'test-app',
    sha: 'abc123',
    branch: 'main',
    pipeline_execution_id: 'exec-1',
    status: 'SUCCESS'
};
export const mockSnapshot = {
    id: 'snap-1',
    status: 'READY',
    author: 'test-user',
    sha: 'abc123',
    branch: 'main'
};
export const mockGateClient = {
    listPipelines: jest.fn(),
    getPipeline: jest.fn(),
    executePipeline: jest.fn(),
    cancelPipeline: jest.fn(),
    pausePipeline: jest.fn(),
    getPipelineExecutionDetails: jest.fn(),
    getDeployHistory: jest.fn(),
    getLastDeploy: jest.fn(),
    getSnapshots: jest.fn(),
    getSnapshotByDetails: jest.fn(),
    executePipelineFromSnapshot: jest.fn(),
    watchPipelineExecution: jest.fn()
};
//# sourceMappingURL=helpers.js.map