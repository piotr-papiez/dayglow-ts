// Components
import Button from "../ui/Button";

// Functions
import { logoutUser } from "@/app/lib/api/auth";

// Styles
import styles from "./UserActions.module.css";

export default function UserActions() {
    return (
        <menu className={styles["container"]}>
            <ul>
                <li>
                    <Button
                        element="a"
                        href={"/settings"}
                        size="small"
                        variant="user-actions"
                        startIconText="settings"
                    >
                    </Button>
                </li>
                <li>
                    <Button
                        onClick={logoutUser}
                        element="button"
                        variant="user-actions"
                        size="small"
                        startIconText="logout"
                    >
                    </Button>
                </li>
            </ul>
        </menu>
    );
}