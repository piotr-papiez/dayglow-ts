"use client";

// Utils
import { redirect } from "next/navigation";
import { apiFetch } from "./client";

// Types
import {
    TaskDataType,
    CreateTaskResponseType, CreateTaskStateType,
    GetTasksResponseType,
    FinishTaskResponseType, FinishTaskStateType
} from "@/types/task.types.js";

import { RefreshTokensResponseType } from "@/types/auth.types";

export async function createTask(
    prevState: CreateTaskStateType | RefreshTokensResponseType,
    formData: FormData
): Promise<CreateTaskStateType | RefreshTokensResponseType> {
    const title = formData.get("title");
    const description = formData.get("description");

    if (!title || typeof title !== "string") return prevState;

    const taskData: TaskDataType = { title };

    if (typeof description === "string" && description.trim()) {
        taskData.description = description.trim();
    }

    const response = await apiFetch<CreateTaskResponseType>("/api/tasks", {
        method: "POST",
        body: JSON.stringify(taskData)
    });

    if (response.ok) redirect("/tasks");

    if (response.message === "ALREADY_EXISTS") return "Zadanie już istnieje";
    if (response.message === "SERVER_ERROR") return "Błąd serwera. Spróbuj później";
    if (response.message === "INVALID_OR_MISSING_REFRESHTOKEN") return "Sesja wygasła. Zaloguj się ponownie.";
}

export async function getTasks(): Promise<GetTasksResponseType> {
    return apiFetch<GetTasksResponseType>("/api/tasks", {
        method: "GET"
    });
}

export async function finishTask(
    taskId: string
): Promise<FinishTaskStateType> {
    const response = await apiFetch<FinishTaskResponseType>(`/api/tasks/${taskId}`, {
        method: "DELETE"
    });

    if (!response) return;

    window.location.href = "/tasks";
}