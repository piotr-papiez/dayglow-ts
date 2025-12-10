const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    try {
        const response = await fetch(`${API_URL}${path}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options
        });

        return response.json() as Promise<T>;
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR" } as T;
    }
}