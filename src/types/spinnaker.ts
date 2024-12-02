export interface SpinnakerApplication {
  name: string;
  email?: string;
  description?: string;
  status?: string;
}

export interface SpinnakerDeployment {
  name: string;
  account: string;
  region: string;
  capacity?: {
    min?: number;
    desired?: number;
    max?: number;
  };
  status?: string;
}

export interface SpinnakerPipeline {
  name: string;           // Pipeline name/ID used for execution
  application: string;    // Associated application name
  description?: string;
  stages?: Array<{
    name: string;
    type: string;
  }>;
}

export interface PipelineExecution {
  execution_id: string;   // The Spinnaker execution ID
  pipeline_name: string;  // Name of the executed pipeline
  status: string;        // Current execution status
  start_time?: string;   // When the execution started
}

export interface PipelineParameters {
  [key: string]: any;
}

export interface SpinnakerConfig {
  apiUrl: string;
  token: string;
}
