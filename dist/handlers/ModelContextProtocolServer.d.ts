import { Request, Response } from 'express';
export declare class ModelContextProtocolServer {
    private contextManager;
    private commandHandler;
    constructor(gateUrl: string, applications: string[], environments: string[]);
    initialize(): Promise<void>;
    handleGetContext(req: Request, res: Response): Promise<void>;
    handleSetContext(req: Request, res: Response): Promise<void>;
    handleCommand(req: Request, res: Response): Promise<void>;
}
