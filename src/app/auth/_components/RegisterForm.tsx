"use client";

// Constants
const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Components
import Input from "@/components/ui/Input";
import InputHint from "@/components/ui/InputHint";
import Button from "@/components/ui/Button";

// Functions
import { registerUser } from "@/app/lib/api/auth";

// Hooks
import { useState, useActionState } from "react";

// Styles
import styles from "./AuthForm.module.css";

// Types
import type { ChangeEvent } from "react";
import { RegisterInputValidType, RegisterDataType, RegisterStateType } from "@/types/auth.types";

export default function RegisterForm() {
    const [formInput, setFormInput] = useState<RegisterDataType>({
        name: "",
        email: "",
        password: ""
    });

    const [actionHints, formAction] = useActionState<RegisterStateType, FormData>(registerUser, null);

    function handleFormInput(event: ChangeEvent<HTMLInputElement>): void {
        setFormInput(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const isInputValid: RegisterInputValidType = {
        name: formInput.name.trim().length >= 2,
        email: MAIL_REGEX.test(formInput.email),
        password: formInput.password.trim().length >= 5
    }

    return (
        <section className={styles.container}>
            <h3>Zarejestruj się</h3>
            <form action={formAction} className={styles.form}>
                <div>
                    <Input
                        onChange={handleFormInput}
                        value={formInput.name}
                        type="text"
                        name="name"
                        placeholder="Imię"
                        required
                    />
                    <InputHint isValid={isInputValid.name}>Min. 2 znaki</InputHint>
                </div>

                <div>
                    <Input
                        onChange={handleFormInput}
                        value={formInput.email}
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        required
                    />
                    <InputHint isValid={isInputValid.email}>Format e-mail</InputHint>
                </div>

                <div>
                    <Input
                        onChange={handleFormInput}
                        value={formInput.password}
                        type="password"
                        name="password"
                        placeholder="Hasło"
                        required
                    />
                    <InputHint isValid={isInputValid.password}>Min. 5 znaków</InputHint>
                </div>

                {typeof actionHints === "string" && <p>{actionHints}</p>}

                <Button
                    element="button"
                    variant="primary"
                    size="small"
                >
                    Zarejestruj się
                </Button>

                <Button
                    element="a"
                    variant="link"
                    href="/auth/login"
                    size="small"
                >
                    Zaloguj się
                </Button>
            </form>
        </section>
    );
}