import { GateClient } from '../clients/GateClient';
import { PipelineExecution, DeployHistory, Snapshot } from '../types/spinnaker';
interface SpinnakerContext {
    activePipelines: {
        [executionId: string]: PipelineExecution;
    };
    recentDeployments: {
        [environment: string]: DeployHistory[];
    };
    activeSnapshots: {
        [application: string]: Snapshot[];
    };
    lastRefresh: number;
}
export declare class ContextManager {
    private gateClient;
    private applications;
    private environments;
    private context;
    private subscriptions;
    constructor(gateClient: GateClient, applications: string[], environments: string[]);
    initialize(): Promise<void>;
    refreshContext(): Promise<void>;
    private refreshPipelines;
    private refreshDeployments;
    private refreshSnapshots;
    private monitorActivePipelines;
    getContext(): SpinnakerContext;
    getRecommendedRefreshInterval(): number;
    needsAttention(executionId: string): boolean;
}
export {};
