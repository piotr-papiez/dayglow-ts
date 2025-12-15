import { useUser } from "@/contexts/user.context";

import styles from "./GreetingUser.module.css"

export default function GreetingUser() {
    const { userName } = useUser();

    return (
        <h2 className={styles.h2}>
            Cześć, {userName}!
        </h2>
    );
}