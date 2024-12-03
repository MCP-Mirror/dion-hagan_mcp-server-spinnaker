import { ContextManager } from './ContextManager';
import { CommandHandler } from './CommandHandler';
import { GateClient } from '../clients/GateClient';
export class ModelContextProtocolServer {
    constructor(gateUrl, applications, environments) {
        const gateClient = new GateClient(gateUrl);
        this.contextManager = new ContextManager(gateClient, applications, environments);
        this.commandHandler = new CommandHandler(gateClient);
    }
    async initialize() {
        await this.contextManager.initialize();
    }
    async handleGetContext(req, res) {
        const context = this.contextManager.getContext();
        const refreshSeconds = this.contextManager.getRecommendedRefreshInterval();
        const response = {
            context,
            refresh_in_seconds: refreshSeconds
        };
        res.json(response);
    }
    async handleSetContext(req, res) {
        const setContextRequest = req.body;
        // For now, we don't allow external context updates
        // Could potentially allow setting of watched applications/environments
        res.status(200).json({ status: 'success' });
    }
    async handleCommand(req, res) {
        const result = await this.commandHandler.handleCommand(req.body);
        res.json(result);
    }
}
//# sourceMappingURL=ModelContextProtocolServer.js.map