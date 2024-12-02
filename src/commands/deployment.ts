import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerDeployment } from "../types/spinnaker";
import { executeCommand } from "../utils/command";
import { validateInput, validateOutput } from "../utils/validation";
import {
  ListDeploymentsInputSchema,
  ListDeploymentsOutputSchema,
  GetDeploymentStatusInputSchema,
  GetDeploymentStatusOutputSchema,
  WatchDeploymentInputSchema,
  WatchDeploymentOutputSchema
} from "../schemas/spinnaker";

/**
 * Lists all deployments for a specific application
 */
export const listDeployments: MCPFunction<{ application: string }, SpinnakerDeployment[]> = async (input) => {
  // Validate input
  const validatedInput = validateInput(ListDeploymentsInputSchema, input);

  // Execute command
  const result = await executeCommand<SpinnakerDeployment[]>(`spm-cli deployment list ${validatedInput.application}`);

  // Validate output
  return validateOutput(ListDeploymentsOutputSchema, result);
};

/**
 * Gets the status of a specific deployment
 */
export const getDeploymentStatus: MCPFunction<{ 
  application: string, 
  name: string 
}, SpinnakerDeployment> = async (input) => {
  // Validate input
  const validatedInput = validateInput(GetDeploymentStatusInputSchema, input);

  // Execute command
  const result = await executeCommand<SpinnakerDeployment>(
    `spm-cli deployment status ${validatedInput.application} ${validatedInput.name}`
  );

  // Validate output
  return validateOutput(GetDeploymentStatusOutputSchema, result);
};

/**
 * Watches a deployment's status until it stabilizes
 */
export const watchDeployment: MCPFunction<{ 
  application: string, 
  name: string 
}, void> = async (input) => {
  // Validate input
  const validatedInput = validateInput(WatchDeploymentInputSchema, input);

  // Execute command
  const result = await executeCommand<void>(
    `spm-cli deployment watch ${validatedInput.application} ${validatedInput.name}`
  );

  // Validate output
  return validateOutput(WatchDeploymentOutputSchema, result);
};
