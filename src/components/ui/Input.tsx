// Styles
import styles from "./Input.module.css";

// Types
import type { ComponentPropsWithoutRef } from "react";

export default function Input(props: ComponentPropsWithoutRef<"input">) {
    return (
        <input
            className={styles.input}
            {...props}
        />
    );
}