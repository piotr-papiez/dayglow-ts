import { useUser } from "@/contexts/user.context";

import styles from "./GreetingUser.module.css"

export default function GreetingUser() {
    const { userName } = useUser();

    return (
        <h3 className={styles.h3}>
            Cześć, {userName}!
        </h3>
    );
}