import { exec } from "child_process";
/**
 * Executes a shell command and returns its output
 * @param command The command to execute
 * @returns A promise that resolves with the command output
 */
export function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Command execution error: ${error}`);
                return;
            }
            try {
                // Attempt to parse JSON output if possible
                resolve(JSON.parse(stdout));
            }
            catch {
                // If not JSON, return raw output
                resolve(stdout);
            }
        });
    });
}
//# sourceMappingURL=command.js.map