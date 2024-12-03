import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerPipeline, PipelineParameters, PipelineExecution } from "../types/spinnaker";
/**
 * Lists all pipelines by name, optionally filtered by application
 */
export declare const listPipelines: MCPFunction<{
    application?: string;
}, SpinnakerPipeline[]>;
/**
 * Executes a pipeline by its name/ID with optional parameters
 * Returns the execution ID for tracking
 */
export declare const executePipeline: MCPFunction<{
    name: string;
    params?: PipelineParameters;
}, PipelineExecution>;
/**
 * Stops a running pipeline execution
 */
export declare const stopPipeline: MCPFunction<{
    executionId: string;
}, void>;
/**
 * Watches a pipeline execution
 */
export declare const watchPipeline: MCPFunction<{
    executionId: string;
}, void>;
/**
 * Deploys a pipeline configuration
 */
export declare const spm_deploy: MCPFunction<{
    app: string;
    pipelineConfigFile: string;
}, void>;
