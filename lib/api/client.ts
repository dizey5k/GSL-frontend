import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

export interface ApiError {
  error?: string;
  message?: string;
  status?: number;
}

export class ApiClient {
  private instance: AxiosInstance;

  constructor(baseURL: string = "/") {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true, // cookies
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Можно добавить CSRF-токен из cookie или мета-тега
        const csrfToken = document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content");
        if (csrfToken) config.headers["X-CSRF-Token"] = csrfToken;
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            // redirect to login
            if (typeof window !== "undefined") {
              window.location.href = "/auth/discord";
            }
          }
          if (status === 429) {
            // rate limit
            const retryAfter = error.response.headers["retry-after"];
            console.warn("Rate limit, retry after:", retryAfter);
          }
          if (status === 503) {
            // tech problem
            console.warn("Site is locked or overloaded");
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient().getInstance();
