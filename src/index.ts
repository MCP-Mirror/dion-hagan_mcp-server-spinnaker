import { MCPServer } from "@modelcontext/mcp";
import { spm_deploy } from "./functions";

const functions = [
  {
    name: "spm_deploy",
    description: "Deploy a Spinnaker pipeline",
    parameters: { 
      properties: {
        app: { type: "string" },
        pipelineConfigFile: { type: "string" },
      },
      required: ["app", "pipelineConfigFile"] 
    }
  }
];

const server = new MCPServer({functions});

server.start();
