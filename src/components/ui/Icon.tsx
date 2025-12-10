// Styles
import styles from "./Icon.module.css";

type IconPropsType = {
    name: string;
    size: "small" | "medium" | "large";
};

export default function Icon({ name, size }: IconPropsType) {
    return (
        <span className={`material-symbols-rounded ${styles[size]}`}>
            {name}
        </span>
    );
}