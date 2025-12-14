export type RegisterInputValidType = {
    name: boolean;
    email: boolean;
    password: boolean;
};

export type RegisterDataType = {
    name: string;
    email: string;
    password: string;
};

export type LoginDataType = {
    email: string;
    password: string;
};

export type RegisterStateType =
    | string
    | null
    | void;

export type RegisterResponseType =
    | { ok: true }
    | { ok: false, message: "ALREADY_EXISTS" | "SERVER_ERROR" };

export type LoginStateType = string | null | void;

export type LoginResponseType =
    | { ok: true }
    | { ok: false, message: "USER_NOT_FOUND" | "INVALID_PASSWORD" | "SERVER_ERROR" };

export type RefreshTokensResponseType =
    | { ok: true }
    | { ok: false, message: "INVALID_OR_MISSING_REFRESHTOKEN" | "UNAUTHORIZED" | "SERVER_ERROR" };

export type LogoutResponseType =
    | { ok: true }
    | { ok: false, message: "SESSION_EXPIRED" | "SERVER_ERROR" };

export type DeleteStateType =
    | string
    | null
    | void;

export type DeleteResponseType =
    | { ok: true }
    | { ok: false, message: "USER_NOT_FOUND" | "INVALID_PASSWORD" | "SERVER_ERROR" };