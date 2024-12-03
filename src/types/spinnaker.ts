/**
 * Core pipeline definition containing stages and configuration
 */
export interface Pipeline {
  /** Unique identifier for the pipeline */
  id: string;
  /** Human readable name */
  name: string;
  /** Application this pipeline belongs to */
  application: string;
  /** Ordered list of stages in the pipeline */
  stages: PipelineStage[];
  /** Current status of the pipeline definition */
  status: PipelineStatus;
}

/**
 * Single execution/run of a pipeline including runtime state
 */
export interface PipelineExecution {
  /** Unique identifier for this execution */
  id: string;
  /** ID of the pipeline being executed */
  pipelineId: string;
  /** Current status of the execution */
  status: PipelineStatus;
  /** When the execution started (Unix timestamp) */
  startTime: number;
  /** When the execution completed (Unix timestamp) */
  endTime?: number;
  /** Current state of each stage */
  stages: PipelineStageExecution[];
}

/**
 * Pipeline stage definition
 */
export interface PipelineStage {
  /** Unique identifier for the stage */
  id: string;
  /** Type of stage (e.g., 'deploy', 'manual-judgment') */
  type: string;
  /** Human readable name */
  name: string;
  /** Reference ID used for stage dependencies */
  refId: string;
  /** IDs of stages that must complete before this one starts */
  requisiteStageRefIds: string[];
}

/**
 * Runtime state of a pipeline stage during execution
 */
export interface PipelineStageExecution extends PipelineStage {
  /** Current status of the stage */
  status: StageStatus;
  /** When the stage started (Unix timestamp) */
  startTime: number;
  /** When the stage completed (Unix timestamp) */
  endTime?: number;
  /** Stage-specific execution details */
  context: Record<string, any>;
}

/**
 * Record of a deployment
 */
export interface DeployHistory {
  /** Unique identifier for the deployment */
  id: string;
  /** Environment deployed to (e.g., 'prod', 'staging') */
  environment: string;
  /** ID of snapshot used for deployment */
  snapshot_id: string;
  /** Application that was deployed */
  application: string;
  /** Git SHA deployed */
  sha: string;
  /** Git branch deployed */
  branch: string;
  /** ID of pipeline execution that performed deployment */
  pipeline_execution_id: string;
  /** Current status of the deployment */
  status: DeployStatus;
}

/**
 * Snapshot of application state for deployment
 */
export interface Snapshot {
  /** Unique identifier for the snapshot */
  id: string;
  /** Current status of the snapshot */
  status: SnapshotStatus;
  /** User who created the snapshot */
  author: string;
  /** Git SHA of the snapshot */
  sha: string;
  /** Git branch of the snapshot */
  branch: string;
}

/**
 * Possible pipeline/execution status values
 */
export type PipelineStatus = 
  /** Pipeline has not started running */
  | 'NOT_STARTED'
  /** Pipeline is actively executing */
  | 'RUNNING'
  /** Pipeline completed successfully */
  | 'SUCCEEDED'
  /** Pipeline failed during execution */
  | 'FAILED'
  /** Pipeline was manually canceled */
  | 'CANCELED'
  /** Pipeline execution is paused */
  | 'PAUSED';

/**
 * Possible stage status values (extends pipeline status)
 */
export type StageStatus = 
  | PipelineStatus
  /** Stage was not executed due to pipeline conditions */
  | 'SKIPPED';

/**
 * Possible deployment status values
 */
export type DeployStatus = 
  /** Deployment is queued to start */
  | 'PENDING'
  /** Deployment is actively running */
  | 'IN_PROGRESS'
  /** Deployment completed successfully */
  | 'SUCCESS'
  /** Deployment failed */
  | 'FAILED'
  /** Deployment was manually canceled */
  | 'CANCELED';

/**
 * Possible snapshot status values
 */
export type SnapshotStatus = 
  /** Snapshot is being created */
  | 'PENDING'
  /** Snapshot is ready for use */
  | 'READY'
  /** Error occurred creating snapshot */
  | 'ERROR';