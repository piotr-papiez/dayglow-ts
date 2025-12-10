"use client";

// Components
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

// Functions
import { createTask } from "@/app/lib/api/task";

// Hooks
import { useActionState } from "react";

// Styles
import styles from "./CreateTaskForm.module.css";

// Types
import { CreateTaskStateType } from "@/types/task.types";

export default function CreateTaskForm() {
    const [actionHints, formAction] = useActionState<CreateTaskStateType, FormData>(createTask, null);

    return (
        <section className={styles.container}>
            <h3>Nowe zadanie</h3>
            <form action={formAction} className={styles.form}>
                <Input name="title" placeholder="Tytuł" required />
                <Textarea name="description" placeholder="Opis" />

                {typeof actionHints === "string" && (
                    <p>{actionHints}</p>
                )}

                <Button element="button" variant="primary" size="small">Zapisz</Button>
                <Button element="a" variant="secondary" href="/tasks" size="small">Anuluj</Button>
            </form>
        </section>
    );
}