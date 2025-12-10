export type GetUserDataResponseType =
    | { ok: true, name: string }
    | { ok: false, message: "USER_NOT_FOUND" | "SERVER_ERROR" };