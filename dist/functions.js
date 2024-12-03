import { z } from 'zod';
import { executeCommand } from "./utils/command";
import { validateInput, validateOutput } from "./utils/validation";
import { SpinnakerConfigSchema } from "./schemas/spinnaker";
/**
 * Initializes Spinnaker configuration with the provided API URL and token
 */
export const initializeSpinnaker = async (input) => {
    // Validate input
    const validatedInput = validateInput(SpinnakerConfigSchema, input);
    // Configure spm-cli with the provided URL and token
    const result = await executeCommand(`spm-cli config set --api-url ${validatedInput.apiUrl} --token ${validatedInput.token}`);
    // Validate output (void in this case)
    return validateOutput(z.void(), result);
};
//# sourceMappingURL=functions.js.map