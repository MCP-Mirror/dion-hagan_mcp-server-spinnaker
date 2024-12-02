import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerApplication } from "../types/spinnaker";
import { executeCommand } from "../utils/command";

/**
 * Lists all Spinnaker applications
 */
export const listApplications: MCPFunction<void, SpinnakerApplication[]> = async () => {
  return executeCommand<SpinnakerApplication[]>('spm-cli app list');
};

/**
 * Gets details for a specific Spinnaker application
 */
export const getApplication: MCPFunction<{ name: string }, SpinnakerApplication> = async ({ name }) => {
  return executeCommand<SpinnakerApplication>(`spm-cli app get ${name}`);
};
