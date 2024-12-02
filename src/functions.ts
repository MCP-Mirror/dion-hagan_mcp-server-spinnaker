import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerConfig } from "./types/spinnaker";
import { executeCommand } from "./utils/command";

/**
 * Initializes Spinnaker configuration with the provided API URL and token
 */
export const initializeSpinnaker: MCPFunction<SpinnakerConfig, void> = async ({ apiUrl, token }) => {
  // Configure spm-cli with the provided URL and token
  await executeCommand(`spm-cli config set --api-url ${apiUrl} --token ${token}`);
};
