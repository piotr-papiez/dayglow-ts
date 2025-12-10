// Components
import Icon from "./Icon";

// Styles
import styles from "./InputHint.module.css";

// Types
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type InputHintPropsType = {
    isValid: boolean;
    children: ReactNode;
} & ComponentPropsWithoutRef<"p">;

export default function InputHint({ isValid, children }: InputHintPropsType) {
    const isValidStyle = isValid ? styles.valid : undefined;

    return (
        <div className={`${styles.hint} ${isValidStyle}`}>
            <p>
                {isValid ? <Icon name="check" size="small" /> : undefined}
                {children}
            </p>
        </div>
    );
}