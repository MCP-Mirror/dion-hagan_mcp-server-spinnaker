import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerDeployment } from "../types/spinnaker";
import { executeCommand } from "../utils/command";

/**
 * Lists all deployments for a specific application
 */
export const listDeployments: MCPFunction<{ application: string }, SpinnakerDeployment[]> = async ({ application }) => {
  return executeCommand<SpinnakerDeployment[]>(`spm-cli deployment list ${application}`);
};

/**
 * Gets the status of a specific deployment
 */
export const getDeploymentStatus: MCPFunction<{ 
  application: string, 
  name: string 
}, SpinnakerDeployment> = async ({ application, name }) => {
  return executeCommand<SpinnakerDeployment>(`spm-cli deployment status ${application} ${name}`);
};

/**
 * Watches a deployment's status until it stabilizes
 */
export const watchDeployment: MCPFunction<{ 
  application: string, 
  name: string 
}, void> = async ({ application, name }) => {
  return executeCommand<void>(`spm-cli deployment watch ${application} ${name}`);
};
