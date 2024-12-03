import { z } from 'zod';
export declare const SpinnakerConfigSchema: z.ZodObject<{
    apiUrl: z.ZodString;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    apiUrl: string;
    token: string;
}, {
    apiUrl: string;
    token: string;
}>;
export declare const SpinnakerApplicationSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status?: string | undefined;
    email?: string | undefined;
    description?: string | undefined;
}, {
    name: string;
    status?: string | undefined;
    email?: string | undefined;
    description?: string | undefined;
}>;
export declare const SpinnakerDeploymentSchema: z.ZodObject<{
    name: z.ZodString;
    account: z.ZodString;
    region: z.ZodString;
    capacity: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        desired: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    }>>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    account: string;
    region: string;
    status?: string | undefined;
    capacity?: {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    } | undefined;
}, {
    name: string;
    account: string;
    region: string;
    status?: string | undefined;
    capacity?: {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    } | undefined;
}>;
export declare const SpinnakerPipelineStageSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    name: string;
}, {
    type: string;
    name: string;
}>;
export declare const SpinnakerPipelineSchema: z.ZodObject<{
    name: z.ZodString;
    application: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    stages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        name: string;
    }, {
        type: string;
        name: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    application: string;
    description?: string | undefined;
    stages?: {
        type: string;
        name: string;
    }[] | undefined;
}, {
    name: string;
    application: string;
    description?: string | undefined;
    stages?: {
        type: string;
        name: string;
    }[] | undefined;
}>;
export declare const PipelineExecutionSchema: z.ZodObject<{
    execution_id: z.ZodString;
    pipeline_name: z.ZodString;
    status: z.ZodString;
    start_time: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: string;
    execution_id: string;
    pipeline_name: string;
    start_time?: string | undefined;
}, {
    status: string;
    execution_id: string;
    pipeline_name: string;
    start_time?: string | undefined;
}>;
export declare const PipelineParametersSchema: z.ZodRecord<z.ZodString, z.ZodAny>;
export declare const ListApplicationsInputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare const ListApplicationsOutputSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status?: string | undefined;
    email?: string | undefined;
    description?: string | undefined;
}, {
    name: string;
    status?: string | undefined;
    email?: string | undefined;
    description?: string | undefined;
}>, "many">;
export declare const GetApplicationInputSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const GetApplicationOutputSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status?: string | undefined;
    email?: string | undefined;
    description?: string | undefined;
}, {
    name: string;
    status?: string | undefined;
    email?: string | undefined;
    description?: string | undefined;
}>;
export declare const ListDeploymentsInputSchema: z.ZodObject<{
    application: z.ZodString;
}, "strip", z.ZodTypeAny, {
    application: string;
}, {
    application: string;
}>;
export declare const ListDeploymentsOutputSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    account: z.ZodString;
    region: z.ZodString;
    capacity: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        desired: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    }>>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    account: string;
    region: string;
    status?: string | undefined;
    capacity?: {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    } | undefined;
}, {
    name: string;
    account: string;
    region: string;
    status?: string | undefined;
    capacity?: {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    } | undefined;
}>, "many">;
export declare const GetDeploymentStatusInputSchema: z.ZodObject<{
    application: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    application: string;
}, {
    name: string;
    application: string;
}>;
export declare const GetDeploymentStatusOutputSchema: z.ZodObject<{
    name: z.ZodString;
    account: z.ZodString;
    region: z.ZodString;
    capacity: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        desired: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    }>>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    account: string;
    region: string;
    status?: string | undefined;
    capacity?: {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    } | undefined;
}, {
    name: string;
    account: string;
    region: string;
    status?: string | undefined;
    capacity?: {
        min?: number | undefined;
        desired?: number | undefined;
        max?: number | undefined;
    } | undefined;
}>;
export declare const WatchDeploymentInputSchema: z.ZodObject<{
    application: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    application: string;
}, {
    name: string;
    application: string;
}>;
export declare const WatchDeploymentOutputSchema: z.ZodVoid;
export declare const ListPipelinesInputSchema: z.ZodObject<{
    application: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    application?: string | undefined;
}, {
    application?: string | undefined;
}>;
export declare const ListPipelinesOutputSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    application: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    stages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        name: string;
    }, {
        type: string;
        name: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    application: string;
    description?: string | undefined;
    stages?: {
        type: string;
        name: string;
    }[] | undefined;
}, {
    name: string;
    application: string;
    description?: string | undefined;
    stages?: {
        type: string;
        name: string;
    }[] | undefined;
}>, "many">;
export declare const ExecutePipelineInputSchema: z.ZodObject<{
    name: z.ZodString;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    params?: Record<string, any> | undefined;
}, {
    name: string;
    params?: Record<string, any> | undefined;
}>;
export declare const ExecutePipelineOutputSchema: z.ZodObject<{
    execution_id: z.ZodString;
    pipeline_name: z.ZodString;
    status: z.ZodString;
    start_time: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: string;
    execution_id: string;
    pipeline_name: string;
    start_time?: string | undefined;
}, {
    status: string;
    execution_id: string;
    pipeline_name: string;
    start_time?: string | undefined;
}>;
export declare const StopPipelineInputSchema: z.ZodObject<{
    executionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    executionId: string;
}, {
    executionId: string;
}>;
export declare const StopPipelineOutputSchema: z.ZodVoid;
export declare const WatchPipelineInputSchema: z.ZodObject<{
    executionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    executionId: string;
}, {
    executionId: string;
}>;
export declare const WatchPipelineOutputSchema: z.ZodVoid;
export declare const SpmDeployInputSchema: z.ZodObject<{
    app: z.ZodString;
    pipelineConfigFile: z.ZodString;
}, "strip", z.ZodTypeAny, {
    app: string;
    pipelineConfigFile: string;
}, {
    app: string;
    pipelineConfigFile: string;
}>;
export declare const SpmDeployOutputSchema: z.ZodVoid;
