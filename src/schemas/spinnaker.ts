import { z } from 'zod';

export const SpinnakerConfigSchema = z.object({
  apiUrl: z.string().url(),
  token: z.string()
});

export const SpinnakerApplicationSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  description: z.string().optional(),
  status: z.string().optional()
});

export const SpinnakerDeploymentSchema = z.object({
  name: z.string(),
  account: z.string(),
  region: z.string(),
  capacity: z.object({
    min: z.number().optional(),
    desired: z.number().optional(),
    max: z.number().optional()
  }).optional(),
  status: z.string().optional()
});

export const SpinnakerPipelineStageSchema = z.object({
  name: z.string(),
  type: z.string()
});

export const SpinnakerPipelineSchema = z.object({
  name: z.string(),
  application: z.string(),
  description: z.string().optional(),
  stages: z.array(SpinnakerPipelineStageSchema).optional()
});

export const PipelineExecutionSchema = z.object({
  execution_id: z.string(),
  pipeline_name: z.string(),
  status: z.string(),
  start_time: z.string().optional()
});

export const PipelineParametersSchema = z.record(z.any());

// Application command schemas
export const ListApplicationsInputSchema = z.object({});
export const ListApplicationsOutputSchema = z.array(SpinnakerApplicationSchema);

export const GetApplicationInputSchema = z.object({
  name: z.string()
});
export const GetApplicationOutputSchema = SpinnakerApplicationSchema;

// Deployment command schemas
export const ListDeploymentsInputSchema = z.object({
  application: z.string()
});
export const ListDeploymentsOutputSchema = z.array(SpinnakerDeploymentSchema);

export const GetDeploymentStatusInputSchema = z.object({
  application: z.string(),
  name: z.string()
});
export const GetDeploymentStatusOutputSchema = SpinnakerDeploymentSchema;

export const WatchDeploymentInputSchema = z.object({
  application: z.string(),
  name: z.string()
});
export const WatchDeploymentOutputSchema = z.void();

// Pipeline command schemas
export const ListPipelinesInputSchema = z.object({
  application: z.string().optional()
});
export const ListPipelinesOutputSchema = z.array(SpinnakerPipelineSchema);

export const ExecutePipelineInputSchema = z.object({
  name: z.string(),
  params: PipelineParametersSchema.optional()
});
export const ExecutePipelineOutputSchema = PipelineExecutionSchema;

export const StopPipelineInputSchema = z.object({
  executionId: z.string()
});
export const StopPipelineOutputSchema = z.void();

export const WatchPipelineInputSchema = z.object({
  executionId: z.string()
});
export const WatchPipelineOutputSchema = z.void();

export const SpmDeployInputSchema = z.object({
  app: z.string(),
  pipelineConfigFile: z.string()
});
export const SpmDeployOutputSchema = z.void();
