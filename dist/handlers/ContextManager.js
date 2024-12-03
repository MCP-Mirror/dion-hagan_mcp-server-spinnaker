export class ContextManager {
    constructor(gateClient, applications, environments) {
        this.gateClient = gateClient;
        this.applications = applications;
        this.environments = environments;
        this.context = {
            activePipelines: {},
            recentDeployments: {},
            activeSnapshots: {},
            lastRefresh: 0
        };
        this.subscriptions = new Map();
    }
    async initialize() {
        await this.refreshContext();
        // Set up WebSocket subscriptions for active pipelines
        this.monitorActivePipelines();
    }
    async refreshContext() {
        await Promise.all([
            this.refreshPipelines(),
            this.refreshDeployments(),
            this.refreshSnapshots()
        ]);
        this.context.lastRefresh = Date.now();
    }
    async refreshPipelines() {
        // Get active pipelines for each application
        const newActivePipelines = {};
        await Promise.all(this.applications.map(async (app) => {
            const pipelines = await this.gateClient.listPipelines(app);
            for (const pipeline of pipelines) {
                const execution = await this.gateClient.getPipelineExecutionDetails(pipeline.id);
                if (['RUNNING', 'NOT_STARTED', 'PAUSED'].includes(execution.status)) {
                    newActivePipelines[execution.id] = execution;
                }
            }
        }));
        this.context.activePipelines = newActivePipelines;
    }
    async refreshDeployments() {
        const newDeployments = {};
        await Promise.all(this.environments.map(async (env) => {
            // Get last 5 deployments for each environment
            const deployments = await this.gateClient.getDeployHistory({ environment: env });
            newDeployments[env] = deployments.slice(0, 5); // Keep last 5
        }));
        this.context.recentDeployments = newDeployments;
    }
    async refreshSnapshots() {
        const newSnapshots = {};
        await Promise.all(this.applications.map(async (app) => {
            const snapshots = await this.gateClient.getSnapshots(app);
            newSnapshots[app] = snapshots.filter(s => s.status === 'PENDING' || s.status === 'READY');
        }));
        this.context.activeSnapshots = newSnapshots;
    }
    monitorActivePipelines() {
        // Clear existing subscriptions
        for (const timeout of this.subscriptions.values()) {
            clearTimeout(timeout);
        }
        this.subscriptions.clear();
        // Set up WebSocket monitoring for each active pipeline
        Object.keys(this.context.activePipelines).forEach((executionId) => {
            this.gateClient.watchPipelineExecution(executionId, (update) => {
                this.context.activePipelines[executionId] = update;
                // If pipeline is complete, schedule cleanup
                if (!['RUNNING', 'NOT_STARTED', 'PAUSED'].includes(update.status)) {
                    const timeout = setTimeout(() => {
                        delete this.context.activePipelines[executionId];
                        this.subscriptions.delete(executionId);
                    }, 300000); // Clean up after 5 minutes
                    this.subscriptions.set(executionId, timeout);
                }
            });
        });
    }
    getContext() {
        return this.context;
    }
    // Helper to calculate recommended refresh interval based on activity
    getRecommendedRefreshInterval() {
        const activePipelineCount = Object.keys(this.context.activePipelines).length;
        const pendingSnapshotCount = Object.values(this.context.activeSnapshots)
            .flat()
            .filter(s => s.status === 'PENDING')
            .length;
        // More frequent updates if there's active stuff happening
        if (activePipelineCount > 0 || pendingSnapshotCount > 0) {
            return 30; // 30 seconds
        }
        return 300; // 5 minutes if nothing active
    }
    // Utility method to check if a specific pipeline needs attention
    needsAttention(executionId) {
        const execution = this.context.activePipelines[executionId];
        if (!execution)
            return false;
        return execution.stages.some(stage => stage.status === 'FAILED' ||
            (stage.status === 'RUNNING' &&
                stage.startTime &&
                Date.now() - stage.startTime > 3600000) // Running for more than an hour
        );
    }
}
//# sourceMappingURL=ContextManager.js.map