import { exec } from "child_process";
import { MCPFunction } from "@modelcontext/mcp";

export const spm_deploy: MCPFunction = async ({ app, pipelineConfigFile }) => {
  return new Promise((resolve, reject) => {
    exec(`spm-cli pipeline-deploy --app ${app} --file ${pipelineConfigFile}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`exec error: ${error}`); 
          return;
        }
        resolve(stdout);
    });
  });  
};
