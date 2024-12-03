import { Request, Response } from 'express';
import { ContextResponse, SetContextRequest } from '../types/protocol';
import { ContextManager } from './ContextManager';
import { CommandHandler } from './CommandHandler';
import { GateClient } from '../clients/GateClient';

export class ModelContextProtocolServer {
  private contextManager: ContextManager;
  private commandHandler: CommandHandler;

  constructor(
    gateUrl: string,
    applications: string[],
    environments: string[]
  ) {
    const gateClient = new GateClient(gateUrl);
    this.contextManager = new ContextManager(gateClient, applications, environments);
    this.commandHandler = new CommandHandler(gateClient);
  }

  async initialize(): Promise<void> {
    await this.contextManager.initialize();
  }

  async handleGetContext(req: Request, res: Response): Promise<void> {
    const context = this.contextManager.getContext();
    const refreshSeconds = this.contextManager.getRecommendedRefreshInterval();

    const response: ContextResponse = {
      context,
      refresh_in_seconds: refreshSeconds
    };

    res.json(response);
  }

  async handleSetContext(req: Request, res: Response): Promise<void> {
    const setContextRequest = req.body as SetContextRequest;
    
    // For now, we don't allow external context updates
    // Could potentially allow setting of watched applications/environments
    res.status(200).json({ status: 'success' });
  }

  async handleCommand(req: Request, res: Response): Promise<void> {
    const result = await this.commandHandler.handleCommand(req.body);
    res.json(result);
  }
}