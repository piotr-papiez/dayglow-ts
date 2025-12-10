// Styles
import styles from "./Textarea.module.css";

// Types
import type { ComponentPropsWithoutRef } from "react";

export default function Textarea(props: ComponentPropsWithoutRef<"textarea">) {
    return (
        <textarea
            className={styles.textarea}
            rows={6}
            maxLength={200}
            {...props}
        >
        </textarea>
    );
}