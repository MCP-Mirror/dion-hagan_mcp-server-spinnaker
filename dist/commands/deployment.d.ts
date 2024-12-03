import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerDeployment } from "../types/spinnaker";
/**
 * Lists all deployments for a specific application
 */
export declare const listDeployments: MCPFunction<{
    application: string;
}, SpinnakerDeployment[]>;
/**
 * Gets the status of a specific deployment
 */
export declare const getDeploymentStatus: MCPFunction<{
    application: string;
    name: string;
}, SpinnakerDeployment>;
/**
 * Watches a deployment's status until it stabilizes
 */
export declare const watchDeployment: MCPFunction<{
    application: string;
    name: string;
}, void>;
