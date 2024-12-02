import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerPipeline, PipelineParameters } from "../types/spinnaker";
import { executeCommand } from "../utils/command";

/**
 * Lists all pipelines, optionally filtered by application
 */
export const listPipelines: MCPFunction<{ application?: string }, SpinnakerPipeline[]> = async ({ application }) => {
  const cmd = application 
    ? `spm-cli pipeline list --application ${application}`
    : 'spm-cli pipeline list';
  
  return executeCommand<SpinnakerPipeline[]>(cmd);
};

/**
 * Executes a pipeline with optional parameters
 */
export const executePipeline: MCPFunction<{ id: string, params?: PipelineParameters }, void> = async ({ id, params }) => {
  const cmd = params 
    ? `spm-cli pipeline execute ${id} --params '${JSON.stringify(params)}'`
    : `spm-cli pipeline execute ${id}`;
  
  return executeCommand<void>(cmd);
};

/**
 * Stops a running pipeline
 */
export const stopPipeline: MCPFunction<{ id: string }, void> = async ({ id }) => {
  return executeCommand<void>(`spm-cli pipeline stop ${id}`);
};

/**
 * Watches a pipeline execution
 */
export const watchPipeline: MCPFunction<{ id: string }, void> = async ({ id }) => {
  return executeCommand<void>(`spm-cli pipeline watch ${id}`);
};

/**
 * Deploys a pipeline configuration
 */
export const spm_deploy: MCPFunction<{ app: string, pipelineConfigFile: string }, void> = async ({ app, pipelineConfigFile }) => {
  return executeCommand<void>(`spm-cli pipeline-deploy --app ${app} --file ${pipelineConfigFile}`);
};
