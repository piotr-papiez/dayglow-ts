// Utils
import { redirect } from "next/navigation";
import { apiFetch } from "./client";

// Types
import {
    RegisterDataType, RegisterStateType, RegisterResponseType,
    LoginDataType, LoginStateType, LoginResponseType,
    LogoutResponseType, DeleteStateType, DeleteResponseType
} from "@/types/auth.types";

export async function registerUser(
    prevState: RegisterStateType,
    formData: FormData
): Promise<RegisterStateType> {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || typeof name !== "string") return prevState;
    if (!email || typeof email !== "string") return prevState;
    if (!password || typeof password !== "string") return prevState;

    const registerData: RegisterDataType = { name, email, password };

    const response = await apiFetch<RegisterResponseType>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(registerData)
    });

    if (response.ok) {
        alert("Konto zostało utworzone. Zaloguj się.");
        redirect("/auth/login");
    }

    if (response.message === "ALREADY_EXISTS") return "Użytkownik już istnieje";
    if (response.message === "SERVER_ERROR") return "Błąd serwera. Spróbuj później";
}

export async function loginUser(
    prevState: LoginStateType,
    formData: FormData
): Promise<LoginStateType> {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || typeof email !== "string") return prevState;
    if (!password || typeof password !== "string") return prevState;

    const loginData: LoginDataType = { email, password };

    const response = await apiFetch<LoginResponseType>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginData)
    });

    if (response.ok) redirect("/tasks");

    if (response.message === "USER_NOT_FOUND") return "Użytkownik nie istnieje";
    if (response.message === "INVALID_PASSWORD") return "Niewłaściwe hasło";
    if (response.message === "SERVER_ERROR") return "Błąd serwera. Spróbuj później";
}

export async function logoutUser(): Promise<void> {
    const response = await apiFetch<LogoutResponseType>("/api/auth/logout", {
        method: "POST"
    });

    if (response.ok) redirect("/auth/login");

    if (response.message === "SESSION_EXPIRED") {
        alert("Sesja nie istnieje.");
        redirect("/auth/login");
    }

    if (response.message === "SERVER_ERROR") {
        alert("Błąd serwera. Spróbuj później.");
        redirect("/auth/login");
    }
}

export async function deleteUser(
    prevState: DeleteStateType,
    formData: FormData
): Promise<DeleteStateType> {
    const password = formData.get("password");

    if (!password || typeof password !== "string") return prevState;

    const response = await apiFetch<DeleteResponseType>("/api/auth/delete", {
        method: "DELETE",
        body: JSON.stringify({ password })
    });

    if (response.ok) {
        alert("Twoje konto zostało usunięte.")
        redirect("/auth/register");
    };

    if (response.message === "USER_NOT_FOUND") return "Użytkownik nie istnieje";
    if (response.message === "INVALID_PASSWORD") return "Niewłaściwe hasło";
    if (response.message === "SERVER_ERROR") return "Błąd serwera. Spróbuj później";
}