// Utils
import { apiFetch } from "./client";

// Types
import { GetUserDataResponseType } from "@/types/user.types";

export async function getUserData(): Promise<GetUserDataResponseType> {
    return apiFetch<GetUserDataResponseType>("/api/user", {
        method: "GET"
    });
}