// Context
import { UserProvider } from "@/contexts/user.context";
import { TasksProvider } from "@/contexts/task.context";

// Types
import type { ReactNode } from "react";

type TasksLayoutPropsType = {
    children: ReactNode;
};

export default function TasksLayout({ children }: TasksLayoutPropsType) {
    return (
        <UserProvider>
            <TasksProvider>
                {children}
            </TasksProvider>
        </UserProvider>
    );
}