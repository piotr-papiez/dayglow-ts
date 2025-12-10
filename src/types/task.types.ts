export type TaskType = {
    _id: string;
    title: string;
    userId: string;
    description?: string;
};

export type TaskDataType = {
    title: string;
    description?: string;
};

export type CreateTaskStateType = string | null | void;

export type CreateTaskResponseType =
    | { ok: true }
    | { ok: false, message: "ALREADY_EXISTS" | "SERVER_ERROR" };

export type GetTasksResponseType =
    | { ok: true, tasks: TaskType[] }
    | { ok: false, message: "USER_NOT_FOUND" | "SERVER_ERROR" };

export type FinishTaskStateType =
    | void
    | { ok: false, message: "INVALID_ID" | "TASK_NOT_FOUND" | "NO_PERMISSIONS" | "SERVER_ERROR" };

export type FinishTaskResponseType =
    | { ok: true }
    | { ok: false, message: "INVALID_ID" | "TASK_NOT_FOUND" | "NO_PERMISSIONS" | "SERVER_ERROR" };