import type { endpoints } from "./endpoints";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/proxy";

interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = config;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || `HTTP error ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  async post<T>(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: "POST", body, headers });
  }

  async put<T>(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: "PUT", body, headers });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Hugging Face API specific methods
export const huggingFaceApi = {
  async generate(prompt: string, options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  }) {
    const response = await apiClient.post<{ generated_text: string }>("/huggingface", {
      inputs: prompt,
      options: {
        wait_for_model: true,
        ...options,
      },
    });
    return response;
  },

  async chat(messages: Array<{ role: string; content: string }>, options?: {
    model?: string;
    maxTokens?: number;
  }) {
    const response = await apiClient.post<{ generated_text: string }>("/huggingface", {
      inputs: JSON.stringify(messages),
      options: {
        wait_for_model: true,
        ...options,
      },
    });
    return response;
  },
};

export type { endpoints };
