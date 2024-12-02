declare module '@modelcontext/mcp' {
  export type MCPFunction<TInput = any, TOutput = any> = (input: TInput) => Promise<TOutput>;
}
