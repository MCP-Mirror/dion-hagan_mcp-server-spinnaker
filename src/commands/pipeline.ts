import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerPipeline, PipelineParameters, PipelineExecution } from "../types/spinnaker";
import { executeCommand } from "../utils/command";

/**
 * Lists all pipelines by name, optionally filtered by application
 */
export const listPipelines: MCPFunction<{ application?: string }, SpinnakerPipeline[]> = async ({ application }) => {
  const cmd = application 
    ? `spm-cli pipeline list --application ${application}`
    : 'spm-cli pipeline list';
  
  return executeCommand<SpinnakerPipeline[]>(cmd);
};

/**
 * Executes a pipeline by its name/ID with optional parameters
 * Returns the execution ID for tracking
 */
export const executePipeline: MCPFunction<{ 
  name: string, 
  params?: PipelineParameters 
}, PipelineExecution> = async ({ name, params }) => {
  const cmd = params 
    ? `spm-cli pipeline execute ${name} --params '${JSON.stringify(params)}'`
    : `spm-cli pipeline execute ${name}`;
  
  return executeCommand<PipelineExecution>(cmd);
};

/**
 * Stops a running pipeline execution
 */
export const stopPipeline: MCPFunction<{ executionId: string }, void> = async ({ executionId }) => {
  return executeCommand<void>(`spm-cli pipeline stop ${executionId}`);
};

/**
 * Watches a pipeline execution
 */
export const watchPipeline: MCPFunction<{ executionId: string }, void> = async ({ executionId }) => {
  return executeCommand<void>(`spm-cli pipeline watch ${executionId}`);
};

/**
 * Deploys a pipeline configuration
 */
export const spm_deploy: MCPFunction<{ 
  app: string, 
  pipelineConfigFile: string
}, void> = async ({ app, pipelineConfigFile }) => {
  return executeCommand<void>(`spm-cli pipeline-deploy --app ${app} --file ${pipelineConfigFile}`);
};
