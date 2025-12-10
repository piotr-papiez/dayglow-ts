"use client";

// Components
import UserActions from "@/components/navigation/UserActions";
import Button from "@/components/ui/Button";
import GreetingUser from "@/components/user/GreetingUser";
import TasksList from "./_components/tasks-list/TasksList";

// Context
import { useUser } from "@/contexts/user.context";
import { useTasks } from "@/contexts/task.context";

// Hooks
import { useEffect } from "react";

// Utils
import { getTasks } from "../lib/api/task";
import { getUserData } from "../lib/api/user";

export default function Tasks() {
    const { setTasks } = useTasks();
    const { setUserName } = useUser();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userData = await getUserData();
                if (userData.ok) setUserName(userData.name);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        }
        fetchUserData();
    }, []);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const tasksData = await getTasks();
                if (tasksData.ok) setTasks(tasksData.tasks);
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            }
        }
        fetchTasks();
    }, []);

    return (
        <>
            <UserActions />
            <GreetingUser />
            <TasksList />
            <Button element="a" variant="add-task" href="/tasks/create" size="large" startIconText="add"></Button>
        </>
    );
}