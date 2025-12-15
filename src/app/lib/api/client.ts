// Constants
let pendingRefresh: Promise<boolean> | null = null;

async function refreshTokens(): Promise<boolean> {
    try {
        const response = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        return response.ok;
    } catch {
        return false;
    }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const makeRequest = (): Promise<Response> => {
        return fetch(path, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options
        });
    };

    try {
        let response = await makeRequest();

        // if (response.status !== 401) return response.json() as Promise<T>;

        if (response.status === 401) {
            if (!pendingRefresh) pendingRefresh = refreshTokens();
            const refreshed = await pendingRefresh;

            if (!refreshed) {
                pendingRefresh = null;
                return {
                    ok: false,
                    message: "INVALID_OR_MISSING_REFRESHTOKEN"
                } as T;
            }

            pendingRefresh = null;

            response = await makeRequest();

            if (!response.ok) {
                return {
                    ok: false,
                    message: "UNAUTHORIZED"
                } as T;
            }
        }



        return response.json() as Promise<T>;
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR" } as T;
    }
}