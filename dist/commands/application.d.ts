import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerApplication } from "../types/spinnaker";
/**
 * Lists all Spinnaker applications
 */
export declare const listApplications: MCPFunction<void, SpinnakerApplication[]>;
/**
 * Gets details for a specific Spinnaker application
 */
export declare const getApplication: MCPFunction<{
    name: string;
}, SpinnakerApplication>;
