"use client";

// Components
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// Functions
import { loginUser } from "@/app/lib/api/auth";

// Hooks
import { useActionState } from "react";

// Styles
import styles from "./AuthForm.module.css";

// Types
import { LoginStateType } from "@/types/auth.types";

export default function LoginForm() {
    const [actionHints, formAction] = useActionState<LoginStateType, FormData>(loginUser, null);

    return (
        <section className={styles.container}>
            <h3>Zaloguj się</h3>
            <form action={formAction} className={styles.form}>
                <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Hasło"
                    required
                />

                {typeof actionHints === "string" && <p>{actionHints}</p>}

                <Button
                    element="button"
                    variant="primary"
                    size="small"
                >
                    Zaloguj się
                </Button>

                <Button
                    element="a"
                    variant="link"
                    href="/auth/register"
                    size="small"
                >
                    Zarejestruj się
                </Button>
            </form>
        </section>
    );
}