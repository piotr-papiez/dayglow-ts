// Components
import Icon from "./Icon";

// Utils
import Link from "next/link";

// Styles
import styles from "./Button.module.css";

// Types
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CommonPropsType = {
    startIconText?: string;
    children?: ReactNode;
    endIconText?: string;
    size: "small" | "medium" | "large";
};

type ButtonPropsType = {
    element: "button";
    variant: "primary" | "secondary" | "tertiary" | "user-actions" | "menu" | "finish-task";
} & CommonPropsType & ComponentPropsWithoutRef<"button">;

type LinkPropsType = {
    element: "a";
    variant: "link" | "secondary" | "user-actions" | "add-task";
} & CommonPropsType & ComponentPropsWithoutRef<typeof Link>;

export default function Button(props: ButtonPropsType | LinkPropsType) {
    if (props.element === "button") {
        const { element, variant, size, startIconText, children, endIconText, ...rest } = props;

        const startIcon = startIconText
            ? <Icon name={startIconText} size={size} />
            : undefined;

        const endIcon = endIconText
            ? <Icon name={endIconText} size={size} />
            : undefined;

        return (
            <button className={`${styles[element]} ${styles[variant]} ${styles[size]}`} {...rest}>
                {startIcon}
                {children}
                {endIcon}
            </button>
        );
    }

    if (props.element === "a") {
        const { element, variant, size, startIconText, children, endIconText, ...rest } = props;

        const startIcon = startIconText
            ? <Icon name={startIconText} size={size} />
            : undefined;

        const endIcon = endIconText
            ? <Icon name={endIconText} size={size} />
            : undefined;

        return (
            <Link className={`${styles[element]} ${styles[variant]} ${styles[size]}`} {...rest}>
                {startIcon}
                {children}
                {endIcon}
            </Link>
        );
    }
}