// Components
import Button from "@/components/ui/Button";

// Context
import { useTasks } from "@/contexts/task.context";

// Functions
import { finishTask } from "@/app/lib/api/task";

// Styles
import styles from "./TasksList.module.css";

export default function TasksList() {
    const { tasks } = useTasks();

    return (
        <section className={styles.container}>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map(task => (
                        <li key={task.title}>
                            <div>
                                <h3 className={styles.title}>{task.title}</h3>
                                <p className={styles.description}>{task.description}</p>
                            </div>
                            <Button
                                onClick={() => finishTask(task._id)}
                                element="button"
                                variant="finish-task"
                                size="medium"
                                startIconText="check"
                            >
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles["no-tasks"]}>
                    Brak zadań na liście.
                </p>
            )}
        </section>
    );
}