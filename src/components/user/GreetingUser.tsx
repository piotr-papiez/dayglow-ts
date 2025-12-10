import { useUser } from "@/contexts/user.context";

export default function GreetingUser() {
    const { userName } = useUser();

    return (
        <h2>
            Cześć, {userName}!
        </h2>
    );
}