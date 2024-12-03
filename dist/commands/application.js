import { executeCommand } from "../utils/command";
import { validateInput, validateOutput } from "../utils/validation";
import { ListApplicationsInputSchema, ListApplicationsOutputSchema, GetApplicationInputSchema, GetApplicationOutputSchema } from "../schemas/spinnaker";
/**
 * Lists all Spinnaker applications
 */
export const listApplications = async (input) => {
    // Validate input
    validateInput(ListApplicationsInputSchema, input);
    // Execute command
    const result = await executeCommand('spm-cli app list');
    // Validate output
    return validateOutput(ListApplicationsOutputSchema, result);
};
/**
 * Gets details for a specific Spinnaker application
 */
export const getApplication = async (input) => {
    // Validate input
    const validatedInput = validateInput(GetApplicationInputSchema, input);
    // Execute command
    const result = await executeCommand(`spm-cli app get ${validatedInput.name}`);
    // Validate output
    return validateOutput(GetApplicationOutputSchema, result);
};
//# sourceMappingURL=application.js.map