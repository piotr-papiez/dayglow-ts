"use client";

// Hooks
import { createContext, useContext, useReducer } from "react";

// Types
import type { ReactNode } from "react";
import type { TaskType } from "@/types/task.types";

type TasksStateType = {
    tasks: TaskType[];
};

type TasksActionType =
    | { type: "SET_TASKS"; payload: TaskType[] };

type TasksContextValueType = {
    tasks: TaskType[];
    setTasks: (tasks: TaskType[]) => void;
};

type TasksContextProviderPropsType = {
    children: ReactNode;
};

const initialState: TasksStateType = { tasks: [] };

function tasksReducer(state: TasksStateType, action: TasksActionType): TasksStateType {
    switch (action.type) {
        case "SET_TASKS":
            return { ...state, tasks: action.payload };
        default:
            return state;
    }
}

const TasksContext = createContext<TasksContextValueType | undefined>(undefined);

export function TasksProvider({ children }: TasksContextProviderPropsType) {
    const [state, dispatch] = useReducer(tasksReducer, initialState);

    const ctxValue: TasksContextValueType = {
        tasks: state.tasks,
        setTasks(tasks: TaskType[]) {
            dispatch({ type: "SET_TASKS", payload: tasks });
        }
    }

    return (
        <TasksContext.Provider value={ctxValue}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks() {
    const ctx = useContext(TasksContext);
    if (!ctx) throw new Error("useTasks must be used inside TasksProvider");

    return ctx;
}