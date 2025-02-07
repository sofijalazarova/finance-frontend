import { useRouter } from "next/navigation";
import useSWR from "swr";
import httpClient from "../api/httpClient";
import { useCallback, useEffect } from "react";
import axios from "axios";

interface AuthProps {
  middleware?: "auth" | "guest";
  redirectIfAuthenticated?: string;
}

export const useAuthGuard = ({
  middleware,
  redirectIfAuthenticated,
}: AuthProps) => {
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        throw new Error("No tokens found");
      }

      const response = await httpClient.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error fetching user:", error);

      if (error.response?.status === 401) {
        console.log("Access token expired. Trying to refresh...");

        try {
          const refreshResponse = await axios.post(
            "http://localhost:8080/api/auth/refresh",
            { refreshToken: localStorage.getItem("refreshToken") },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          console.log("New access token received:", refreshResponse.data);

          localStorage.setItem("accessToken", refreshResponse.data.accessToken);
          localStorage.setItem(
            "refreshToken",
            refreshResponse.data.refreshToken
          );

          const retryResponse = await httpClient.get("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${refreshResponse.data.accessToken}`,
            },
          });

          return retryResponse.data;
        } catch (refreshError) {
          console.error("Refresh token is invalid. Logging out...");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/sign-in";
          throw refreshError;
        }
      }

      throw error;
    }
  }, []);

  // const fetchUser = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) throw new Error("No token found");
  //     const response = await httpClient.get("/api/auth/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error");
  //     throw error;
  //   }
  // };

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/auth/me", fetchUser, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const login = async ({
    onError,
    props,
  }: {
    onError: (errors: HttpErrorResponse | undefined) => void;
    props: { email: string; password: string };
  }) => {
    onError(undefined);
    try {
      //const response = await axios.post<{ token: string }>(
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: props.email,
          password: props.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.token);

      //const token = response.data.token;
      //localStorage.setItem("token", token);

      console.log("Login Successful");
      mutate();
    } catch (err) {
      const errors = err.response?.data as HttpErrorResponse;
      console.log("Login Error:", errors);
      onError(errors);
    }
  };

  const isHttpErrorResponse = (error: unknown): error is HttpErrorResponse => {
    return (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as any).response === "object"
    );
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.warn("No refresh token found");
    } else {
      await axios.post(
        "http://localhost:8080/api/auth/logout",
        { token: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      mutate();
      window.location.pathname = "/sign-in";
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.replace("/sign-in");
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user?.id) {
      console.log("Redirecting to:", redirectIfAuthenticated);
      router.replace(redirectIfAuthenticated);
    } else if (middleware === "auth" && error) {
      console.error("Authentication failed:", error);
      logout();
    }
  }, [middleware, redirectIfAuthenticated, user, error, router]);

  return { user, login, mutate, logout };
};
