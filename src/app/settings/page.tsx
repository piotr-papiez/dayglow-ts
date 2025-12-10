// Components
import Button from "@/components/ui/Button";
import SettingsList from "./_components/SettingsList";

// Styles
import styles from "./page.module.css";

export default function Settings() {
    return (
        <>
            <div className={styles["header-wrapper"]}>
                <Button
                    element="a"
                    variant="user-actions"
                    size="medium"
                    startIconText="arrow_back"
                    href={"/tasks"}
                >
                </Button>
                <h2>Ustawienia</h2>
            </div>
            <SettingsList />
        </>
    );
}