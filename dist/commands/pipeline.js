import { executeCommand } from "../utils/command";
import { validateInput, validateOutput } from "../utils/validation";
import { ListPipelinesInputSchema, ListPipelinesOutputSchema, ExecutePipelineInputSchema, ExecutePipelineOutputSchema, StopPipelineInputSchema, StopPipelineOutputSchema, WatchPipelineInputSchema, WatchPipelineOutputSchema, SpmDeployInputSchema, SpmDeployOutputSchema } from "../schemas/spinnaker";
/**
 * Lists all pipelines by name, optionally filtered by application
 */
export const listPipelines = async (input) => {
    // Validate input
    const validatedInput = validateInput(ListPipelinesInputSchema, input);
    // Build command
    const cmd = validatedInput.application
        ? `spm-cli pipeline list --application ${validatedInput.application}`
        : 'spm-cli pipeline list';
    // Execute command
    const result = await executeCommand(cmd);
    // Validate output
    return validateOutput(ListPipelinesOutputSchema, result);
};
/**
 * Executes a pipeline by its name/ID with optional parameters
 * Returns the execution ID for tracking
 */
export const executePipeline = async (input) => {
    // Validate input
    const validatedInput = validateInput(ExecutePipelineInputSchema, input);
    // Build command
    const cmd = validatedInput.params
        ? `spm-cli pipeline execute ${validatedInput.name} --params '${JSON.stringify(validatedInput.params)}'`
        : `spm-cli pipeline execute ${validatedInput.name}`;
    // Execute command
    const result = await executeCommand(cmd);
    // Validate output
    return validateOutput(ExecutePipelineOutputSchema, result);
};
/**
 * Stops a running pipeline execution
 */
export const stopPipeline = async (input) => {
    // Validate input
    const validatedInput = validateInput(StopPipelineInputSchema, input);
    // Execute command
    const result = await executeCommand(`spm-cli pipeline stop ${validatedInput.executionId}`);
    // Validate output
    return validateOutput(StopPipelineOutputSchema, result);
};
/**
 * Watches a pipeline execution
 */
export const watchPipeline = async (input) => {
    // Validate input
    const validatedInput = validateInput(WatchPipelineInputSchema, input);
    // Execute command
    const result = await executeCommand(`spm-cli pipeline watch ${validatedInput.executionId}`);
    // Validate output
    return validateOutput(WatchPipelineOutputSchema, result);
};
/**
 * Deploys a pipeline configuration
 */
export const spm_deploy = async (input) => {
    // Validate input
    const validatedInput = validateInput(SpmDeployInputSchema, input);
    // Execute command
    const result = await executeCommand(`spm-cli pipeline-deploy --app ${validatedInput.app} --file ${validatedInput.pipelineConfigFile}`);
    // Validate output
    return validateOutput(SpmDeployOutputSchema, result);
};
//# sourceMappingURL=pipeline.js.map