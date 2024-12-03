import { ContextManager } from '../handlers/ContextManager';
import { mockGateClient, mockPipeline, mockPipelineExecution, mockDeployHistory, mockSnapshot } from './helpers';
describe('ContextManager', () => {
    let manager;
    const testApps = ['test-app'];
    const testEnvs = ['prod', 'staging'];
    beforeEach(() => {
        jest.clearAllMocks();
        manager = new ContextManager(mockGateClient, testApps, testEnvs);
    });
    describe('initialization', () => {
        beforeEach(() => {
            mockGateClient.listPipelines.mockResolvedValue([mockPipeline]);
            mockGateClient.getPipelineExecutionDetails.mockResolvedValue(mockPipelineExecution);
            mockGateClient.getDeployHistory.mockResolvedValue([mockDeployHistory]);
            mockGateClient.getSnapshots.mockResolvedValue([mockSnapshot]);
        });
        test('loads initial context on initialization', async () => {
            await manager.initialize();
            const context = manager.getContext();
            expect(context.lastRefresh).toBeTruthy();
            expect(mockGateClient.listPipelines).toHaveBeenCalledWith('test-app');
            expect(mockGateClient.getDeployHistory).toHaveBeenCalled();
            expect(mockGateClient.getSnapshots).toHaveBeenCalled();
        });
    });
    describe('context refresh', () => {
        test('updates context data on refresh', async () => {
            await manager.initialize();
            const initialRefresh = manager.getContext().lastRefresh;
            // Wait to ensure timestamp will be different
            await new Promise(resolve => setTimeout(resolve, 10));
            await manager.refreshContext();
            const newRefresh = manager.getContext().lastRefresh;
            expect(newRefresh).toBeGreaterThan(initialRefresh);
        });
        test('maintains active pipeline monitoring', async () => {
            mockGateClient.listPipelines.mockResolvedValue([mockPipeline]);
            mockGateClient.getPipelineExecutionDetails.mockResolvedValue({
                ...mockPipelineExecution,
                status: 'RUNNING'
            });
            await manager.initialize();
            const beforeCount = Object.keys(manager.getContext().activePipelines).length;
            // Add another running pipeline
            mockGateClient.getPipelineExecutionDetails.mockResolvedValue({
                ...mockPipelineExecution,
                id: 'exec-2',
                status: 'RUNNING'
            });
            await manager.refreshContext();
            const afterCount = Object.keys(manager.getContext().activePipelines).length;
            expect(afterCount).toBeGreaterThan(beforeCount);
        });
    });
    describe('pipeline monitoring', () => {
        test('sets up WebSocket monitoring for active pipelines', async () => {
            mockGateClient.listPipelines.mockResolvedValue([mockPipeline]);
            mockGateClient.getPipelineExecutionDetails.mockResolvedValue({
                ...mockPipelineExecution,
                status: 'RUNNING'
            });
            await manager.initialize();
            expect(mockGateClient.watchPipelineExecution).toHaveBeenCalledWith(mockPipelineExecution.id, expect.any(Function));
        });
        test('updates pipeline state on WebSocket updates', async () => {
            mockGateClient.listPipelines.mockResolvedValue([mockPipeline]);
            mockGateClient.getPipelineExecutionDetails.mockResolvedValue({
                ...mockPipelineExecution,
                status: 'RUNNING'
            });
            await manager.initialize();
            // Simulate WebSocket update
            const [_, updateCallback] = mockGateClient.watchPipelineExecution.mock.calls[0];
            const updatedExecution = {
                ...mockPipelineExecution,
                status: 'SUCCEEDED'
            };
            updateCallback(updatedExecution);
            expect(manager.getContext().activePipelines[mockPipelineExecution.id].status)
                .toBe('SUCCEEDED');
        });
        test('cleans up completed pipelines after delay', async () => {
            jest.useFakeTimers();
            mockGateClient.listPipelines.mockResolvedValue([mockPipeline]);
            mockGateClient.getPipelineExecutionDetails.mockResolvedValue({
                ...mockPipelineExecution,
                status: 'RUNNING'
            });
            await manager.initialize();
            // Simulate pipeline completion
            const [_, updateCallback] = mockGateClient.watchPipelineExecution.mock.calls[0];
            updateCallback({
                ...mockPipelineExecution,
                status: 'SUCCEEDED'
            });
            // Fast forward past cleanup delay
            jest.advanceTimersByTime(301000); // 5 minutes + 1 second
            expect(manager.getContext().activePipelines[mockPipelineExecution.id])
                .toBeUndefined();
            jest.useRealTimers();
        });
    });
    describe('refresh interval calculation', () => {
        test('suggests shorter interval when there is active work', async () => {
            mockGateClient.listPipelines.mockResolvedValue([mockPipeline]);
            mockGateClient.getPipelineExecutionDetails.mockResolvedValue({
                ...mockPipelineExecution,
                status: 'RUNNING'
            });
            await manager.initialize();
            const refreshInterval = manager.getRecommendedRefreshInterval();
            expect(refreshInterval).toBe(30); // 30 seconds
        });
        test('suggests longer interval when nothing is active', async () => {
            mockGateClient.listPipelines.mockResolvedValue([mockPipeline]);
            mockGateClient.getPipelineExecutionDetails.mockResolvedValue({
                ...mockPipelineExecution,
                status: 'SUCCEEDED'
            });
            await manager.initialize();
            const refreshInterval = manager.getRecommendedRefreshInterval();
            expect(refreshInterval).toBe(300); // 5 minutes
        });
    });
});
//# sourceMappingURL=ContextManager.test.js.map