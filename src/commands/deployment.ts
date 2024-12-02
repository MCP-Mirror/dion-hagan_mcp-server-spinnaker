import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerDeployment } from "../types/spinnaker";
import { executeCommand } from "../utils/command";

/**
 * Lists all deployments for a specific application
 */
export const listDeployments: MCPFunction<{ application: string }, SpinnakerDeployment[]> = async ({ application }) => {
  return executeCommand<SpinnakerDeployment[]>(`spm-cli deployment list ${application}`);
};
