import { GateClient } from '../clients/GateClient';
import { CommandRequest, CommandResponse } from '../types/protocol';
export declare class CommandHandler {
    private gateClient;
    constructor(gateClient: GateClient);
    handleCommand(req: CommandRequest): Promise<CommandResponse>;
    private listPipelines;
    private getPipeline;
    private executePipeline;
    private pausePipeline;
    private cancelPipeline;
    private getPipelineExecution;
    private listDeployHistory;
    private getLastDeploy;
    private listSnapshots;
    private getSnapshot;
    private deployFromSnapshot;
}
