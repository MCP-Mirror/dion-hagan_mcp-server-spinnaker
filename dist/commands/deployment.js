import { executeCommand } from "../utils/command";
import { validateInput, validateOutput } from "../utils/validation";
import { ListDeploymentsInputSchema, ListDeploymentsOutputSchema, GetDeploymentStatusInputSchema, GetDeploymentStatusOutputSchema, WatchDeploymentInputSchema, WatchDeploymentOutputSchema } from "../schemas/spinnaker";
/**
 * Lists all deployments for a specific application
 */
export const listDeployments = async (input) => {
    // Validate input
    const validatedInput = validateInput(ListDeploymentsInputSchema, input);
    // Execute command
    const result = await executeCommand(`spm-cli deployment list ${validatedInput.application}`);
    // Validate output
    return validateOutput(ListDeploymentsOutputSchema, result);
};
/**
 * Gets the status of a specific deployment
 */
export const getDeploymentStatus = async (input) => {
    // Validate input
    const validatedInput = validateInput(GetDeploymentStatusInputSchema, input);
    // Execute command
    const result = await executeCommand(`spm-cli deployment status ${validatedInput.application} ${validatedInput.name}`);
    // Validate output
    return validateOutput(GetDeploymentStatusOutputSchema, result);
};
/**
 * Watches a deployment's status until it stabilizes
 */
export const watchDeployment = async (input) => {
    // Validate input
    const validatedInput = validateInput(WatchDeploymentInputSchema, input);
    // Execute command
    const result = await executeCommand(`spm-cli deployment watch ${validatedInput.application} ${validatedInput.name}`);
    // Validate output
    return validateOutput(WatchDeploymentOutputSchema, result);
};
//# sourceMappingURL=deployment.js.map