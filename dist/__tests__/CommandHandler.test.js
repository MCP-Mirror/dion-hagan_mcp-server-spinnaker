import { CommandHandler } from '../handlers/CommandHandler';
import { mockGateClient, mockPipeline, mockDeployHistory, mockSnapshot } from './helpers';
describe('CommandHandler', () => {
    let handler;
    beforeEach(() => {
        jest.clearAllMocks();
        handler = new CommandHandler(mockGateClient);
    });
    describe('Pipeline Operations', () => {
        test('listPipelines returns pipelines for application', async () => {
            mockGateClient.listPipelines.mockResolvedValue([mockPipeline]);
            const result = await handler.handleCommand({
                command: 'list-pipelines',
                args: { application: 'test-app' }
            });
            expect(result.result?.pipelines).toEqual([mockPipeline]);
            expect(mockGateClient.listPipelines).toHaveBeenCalledWith('test-app');
        });
        test('executePipeline starts pipeline execution', async () => {
            mockGateClient.executePipeline.mockResolvedValue('exec-1');
            const result = await handler.handleCommand({
                command: 'execute-pipeline',
                args: {
                    application: 'test-app',
                    pipelineId: 'pipeline-1',
                    params: { version: '1.0.0' }
                }
            });
            expect(result.result?.executionId).toBe('exec-1');
            expect(mockGateClient.executePipeline).toHaveBeenCalledWith('test-app', 'pipeline-1', { version: '1.0.0' });
        });
        test('cancelPipeline cancels execution', async () => {
            const result = await handler.handleCommand({
                command: 'cancel-pipeline',
                args: { executionId: 'exec-1' }
            });
            expect(result.result?.message).toBe('Pipeline canceled successfully');
            expect(mockGateClient.cancelPipeline).toHaveBeenCalledWith('exec-1');
        });
    });
    describe('Deploy History Operations', () => {
        test('listDeployHistory returns filtered history', async () => {
            mockGateClient.getDeployHistory.mockResolvedValue([mockDeployHistory]);
            const result = await handler.handleCommand({
                command: 'list-deploys',
                args: {
                    application: 'test-app',
                    environment: 'prod'
                }
            });
            expect(result.result?.deployHistory).toEqual([mockDeployHistory]);
            expect(mockGateClient.getDeployHistory).toHaveBeenCalledWith({
                application: 'test-app',
                environment: 'prod'
            });
        });
        test('getLastDeploy returns most recent deploy', async () => {
            mockGateClient.getLastDeploy.mockResolvedValue(mockDeployHistory);
            const result = await handler.handleCommand({
                command: 'get-last-deploy',
                args: {
                    environment: 'prod',
                    application: 'test-app'
                }
            });
            expect(result.result?.lastDeploy).toEqual(mockDeployHistory);
            expect(mockGateClient.getLastDeploy).toHaveBeenCalledWith('prod', 'test-app');
        });
    });
    describe('Snapshot Operations', () => {
        test('listSnapshots returns application snapshots', async () => {
            mockGateClient.getSnapshots.mockResolvedValue([mockSnapshot]);
            const result = await handler.handleCommand({
                command: 'list-snapshots',
                args: { application: 'test-app' }
            });
            expect(result.result?.snapshots).toEqual([mockSnapshot]);
            expect(mockGateClient.getSnapshots).toHaveBeenCalledWith('test-app');
        });
        test('deployFromSnapshot starts pipeline with snapshot', async () => {
            mockGateClient.executePipelineFromSnapshot.mockResolvedValue('exec-1');
            const result = await handler.handleCommand({
                command: 'deploy-snapshot',
                args: {
                    application: 'test-app',
                    pipelineId: 'pipeline-1',
                    snapshotId: 'snap-1'
                }
            });
            expect(result.result?.executionId).toBe('exec-1');
            expect(mockGateClient.executePipelineFromSnapshot).toHaveBeenCalledWith('test-app', 'pipeline-1', 'snap-1');
        });
    });
    describe('Error Handling', () => {
        test('handles unknown commands', async () => {
            const result = await handler.handleCommand({
                command: 'invalid-command',
                args: {}
            });
            expect(result.error).toBe('Unknown command: invalid-command');
        });
        test('handles missing required arguments', async () => {
            const result = await handler.handleCommand({
                command: 'list-pipelines',
                args: {}
            });
            expect(result.error).toBe('Application name required');
        });
        test('handles client errors', async () => {
            mockGateClient.listPipelines.mockRejectedValue(new Error('API error'));
            const result = await handler.handleCommand({
                command: 'list-pipelines',
                args: { application: 'test-app' }
            });
            expect(result.error).toBe('API error');
        });
    });
});
//# sourceMappingURL=CommandHandler.test.js.map