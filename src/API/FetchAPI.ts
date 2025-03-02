const BASE_URL = "http://localhost:5000/api/"; // Update based on your backend URL

// Define HTTP methods
type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

// Define generic API response type
interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

const fetchApi = async <T>(
    method: HttpMethod,
    endpoint: string,
    data: Record<string, any> | null = null,
    requiresAuth: boolean = false
): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = { "Content-Type": "application/json" };

    // Attach token if authentication is required
    const token = localStorage.getItem("token");
    if (requiresAuth && token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options: RequestInit = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    };

    try {
        console.log("endpoint>>",endpoint)
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const result: ApiResponse<T> = await response.json();
        if (!response.ok) throw new Error(result.message || "Something went wrong");
        return result;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export default fetchApi;
