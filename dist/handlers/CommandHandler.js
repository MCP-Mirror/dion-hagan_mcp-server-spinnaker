export class CommandHandler {
    constructor(gateClient) {
        this.gateClient = gateClient;
    }
    async handleCommand(req) {
        try {
            const { command, args = {} } = req;
            switch (command) {
                // Pipeline operations
                case 'list-pipelines':
                    return this.listPipelines(args.application);
                case 'get-pipeline':
                    return this.getPipeline(args.application, args.pipelineId);
                case 'execute-pipeline':
                    return this.executePipeline(args.application, args.pipelineId, args.params);
                case 'pause-pipeline':
                    return this.pausePipeline(args.executionId);
                case 'cancel-pipeline':
                    return this.cancelPipeline(args.executionId);
                case 'get-pipeline-execution':
                    return this.getPipelineExecution(args.executionId);
                // Deploy history operations
                case 'list-deploys':
                    return this.listDeployHistory(args);
                case 'get-last-deploy':
                    return this.getLastDeploy(args.environment, args.application);
                // Snapshot operations  
                case 'list-snapshots':
                    return this.listSnapshots(args.application);
                case 'get-snapshot':
                    return this.getSnapshot(args.application, args.sha, args.branch);
                case 'deploy-snapshot':
                    return this.deployFromSnapshot(args.application, args.pipelineId, args.snapshotId);
                default:
                    return { error: `Unknown command: ${command}` };
            }
        }
        catch (error) {
            return {
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
    async listPipelines(application) {
        if (!application)
            return { error: 'Application name required' };
        const pipelines = await this.gateClient.listPipelines(application);
        return { result: { pipelines } };
    }
    async getPipeline(application, pipelineId) {
        if (!application || !pipelineId)
            return { error: 'Application and pipeline ID required' };
        const pipeline = await this.gateClient.getPipeline(application, pipelineId);
        return { result: { pipeline } };
    }
    async executePipeline(application, pipelineId, params) {
        if (!application || !pipelineId)
            return { error: 'Application and pipeline ID required' };
        const executionId = await this.gateClient.executePipeline(application, pipelineId, params);
        return { result: { executionId } };
    }
    async pausePipeline(executionId) {
        if (!executionId)
            return { error: 'Execution ID required' };
        await this.gateClient.pausePipeline(executionId);
        return { result: { message: 'Pipeline paused successfully' } };
    }
    async cancelPipeline(executionId) {
        if (!executionId)
            return { error: 'Execution ID required' };
        await this.gateClient.cancelPipeline(executionId);
        return { result: { message: 'Pipeline canceled successfully' } };
    }
    async getPipelineExecution(executionId) {
        if (!executionId)
            return { error: 'Execution ID required' };
        const execution = await this.gateClient.getPipelineExecutionDetails(executionId);
        return { result: { execution } };
    }
    async listDeployHistory(filters) {
        const history = await this.gateClient.getDeployHistory(filters);
        return { result: { deployHistory: history } };
    }
    async getLastDeploy(environment, application) {
        if (!environment || !application)
            return { error: 'Environment and application required' };
        const lastDeploy = await this.gateClient.getLastDeploy(environment, application);
        return { result: { lastDeploy } };
    }
    async listSnapshots(application) {
        if (!application)
            return { error: 'Application required' };
        const snapshots = await this.gateClient.getSnapshots(application);
        return { result: { snapshots } };
    }
    async getSnapshot(application, sha, branch) {
        if (!application || !sha || !branch)
            return { error: 'Application, SHA, and branch required' };
        const snapshot = await this.gateClient.getSnapshotByDetails(application, sha, branch);
        return { result: { snapshot } };
    }
    async deployFromSnapshot(application, pipelineId, snapshotId) {
        if (!application || !pipelineId || !snapshotId) {
            return { error: 'Application, pipeline ID, and snapshot ID required' };
        }
        const executionId = await this.gateClient.executePipelineFromSnapshot(application, pipelineId, snapshotId);
        return { result: { executionId } };
    }
}
//# sourceMappingURL=CommandHandler.js.map