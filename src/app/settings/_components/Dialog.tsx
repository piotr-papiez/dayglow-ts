"use client";

// Components
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// Functions
import { deleteUser } from "@/app/lib/api/auth";

// Hooks
import { useActionState, useEffect, useState } from "react";

// Styles
import styles from "./Dialog.module.css";

// Types
import type { ComponentPropsWithRef } from "react";
import type { DeleteStateType } from "@/types/auth.types";

// Utils
import { createPortal } from "react-dom";

type DialogPropsType = {
    closeDialog: () => void;
} & ComponentPropsWithRef<"dialog">;

export default function Dialog({ closeDialog, ref }: DialogPropsType) {
    const [mounted, setMounted] = useState<boolean>(false);

    const [actionHints, formAction] = useActionState<DeleteStateType, FormData>(deleteUser, null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return;

    return createPortal((
        <dialog className={styles.container} ref={ref}>
            <form className={styles.form} action={formAction}>
                <h2>Usuń konto</h2>
                <p>Wprowadź hasło, aby usunąć konto.</p>

                <Input
                    type="password"
                    name="password"
                    required
                />

                {typeof actionHints === "string" && <p>{actionHints}</p>}

                <div className={styles["buttons-wrapper"]}>
                    <Button
                        element="button"
                        variant="secondary"
                        size="small"
                    >
                        Usuń bezpowrotnie
                    </Button>
                    <Button
                        onClick={closeDialog}
                        element="button"
                        variant="secondary"
                        size="small"
                        type="button"
                    >
                        Anuluj
                    </Button>
                </div>
            </form>
        </dialog>
    ), document.body);
}