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
  id: string;
  name: string;
  application: string;
  status?: string;
  stages?: Array<{
    name: string;
    status: string;
  }>;
}

export interface PipelineParameters {
  [key: string]: any;
}
