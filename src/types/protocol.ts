import { 
  Pipeline,
  PipelineExecution,
  PipelineStage,
  PipelineStatus,
  StageStatus,
  DeployHistory,
  DeployStatus,
  Snapshot,
  SnapshotStatus
} from './spinnaker';

/**
 * Response from the /mcp/v1/context endpoint containing current Spinnaker state
 */
export interface ContextResponse {
  /** Current state of pipelines, deployments, and snapshots */
  context: SpinnakerContext;
  /** Recommended number of seconds before requesting context refresh */
  refresh_in_seconds?: number;
}

/**
 * Request to /mcp/v1/set_context endpoint to update tracked state
 */
export interface SetContextRequest {
  context: Partial<SpinnakerContext>;
  /** If true, replaces entire context instead of merging */
  reset?: boolean;
}

/**
 * Complete Spinnaker context tracking active operations and recent history
 */
export interface SpinnakerContext {
  /** Currently executing pipeline runs indexed by execution ID */
  activePipelines: {
    [executionId: string]: PipelineExecution;
  };
  /** Recent deployment history grouped by environment */
  recentDeployments: {
    [environment: string]: DeployHistory[];
  };
  /** Active snapshots grouped by application */
  activeSnapshots: {
    [application: string]: Snapshot[];
  };
  /** Timestamp of last context refresh */
  lastRefresh: number;
}

/**
 * Request structure for commands
 */
export interface CommandRequest {
  /** Command to execute */
  command: string;
  /** Command-specific arguments */
  args?: Record<string, any>;
}

/**
 * Parsed command with validated arguments
 */
export interface ParsedCommand {
  /** Validated command action */
  action: string;
  /** Validated command arguments */
  args: Record<string, any>;
}

/**
 * Response structure for all commands
 */
export interface CommandResponse {
  /** Command-specific response data */
  result?: {
    pipelines?: Pipeline[];
    pipeline?: Pipeline;
    executionId?: string;
    execution?: PipelineExecution;
    deployHistory?: DeployHistory[];
    lastDeploy?: DeployHistory;
    snapshots?: Snapshot[];
    snapshot?: Snapshot;
    message?: string;
  };
  /** Error message if command failed */
  error?: string;
  /** Optional command suggestions on error */
  suggestions?: string[];
}

// Re-export core types
export type {
  Pipeline,
  PipelineExecution,
  PipelineStage,
  PipelineStatus,
  StageStatus,
  DeployHistory,
  DeployStatus,
  Snapshot,
  SnapshotStatus
};