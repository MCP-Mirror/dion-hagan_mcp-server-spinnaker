import { MCPFunction } from "@modelcontext/mcp";
import { SpinnakerApplication } from "../types/spinnaker";
import { executeCommand } from "../utils/command";
import { validateInput, validateOutput } from "../utils/validation";
import {
  ListApplicationsInputSchema,
  ListApplicationsOutputSchema,
  GetApplicationInputSchema,
  GetApplicationOutputSchema
} from "../schemas/spinnaker";

/**
 * Lists all Spinnaker applications
 */
export const listApplications: MCPFunction<void, SpinnakerApplication[]> = async (input) => {
  // Validate input
  validateInput(ListApplicationsInputSchema, input);

  // Execute command
  const result = await executeCommand<SpinnakerApplication[]>('spm-cli app list');

  // Validate output
  return validateOutput(ListApplicationsOutputSchema, result);
};

/**
 * Gets details for a specific Spinnaker application
 */
export const getApplication: MCPFunction<{ name: string }, SpinnakerApplication> = async (input) => {
  // Validate input
  const validatedInput = validateInput(GetApplicationInputSchema, input);

  // Execute command
  const result = await executeCommand<SpinnakerApplication>(`spm-cli app get ${validatedInput.name}`);

  // Validate output
  return validateOutput(GetApplicationOutputSchema, result);
};
