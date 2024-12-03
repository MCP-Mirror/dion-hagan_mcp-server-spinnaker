declare module '@modelcontextprotocol/sdk' {
  export class BaseServer {
    protected registerTools(tools: any[]): void;
  }
  export interface CommandResult {
    success: boolean;
    data?: any;
    error?: string;
  }
  export interface Tool {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: Record<string, any>;
      required: string[];
    };
  }
}
