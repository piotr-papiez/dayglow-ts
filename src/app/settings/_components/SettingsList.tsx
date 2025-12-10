"use client";

// Components
import Button from "@/components/ui/Button";
import Dialog from "./Dialog";

// Hooks
import { useRef } from "react";

// Styles
import settingsStyles from "./SettingsList.module.css";
import dialogStyles from "./Dialog.module.css";

export default function SettingsList() {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    function openDialog(): void {
        dialogRef.current?.showModal();

        requestAnimationFrame(() => {
            dialogRef.current?.classList.add(dialogStyles.show);
        });
    }

    function closeDialog(): void {
        dialogRef.current?.close();
        dialogRef.current?.classList.remove(dialogStyles.show);
    }

    return (
        <>
            <menu className={settingsStyles.menu}>
                <li>
                    <Button
                        onClick={openDialog}
                        element="button"
                        variant="menu"
                        size="medium"
                    >
                        Usuń konto
                    </Button>
                </li>
            </menu>

            <Dialog
                ref={dialogRef}
                closeDialog={closeDialog}
            />
        </>
    );
}