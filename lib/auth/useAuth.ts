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

  // const fetchUser = useCallback(async () => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const refreshToken = localStorage.getItem("refreshToken");

  //     if (!accessToken) {
  //       console.log("No access token found. User is not logged in.");

  //       if (!refreshToken) {
  //         console.error("No refresh token found");
  //         router.replace("/sign-in");
  //         return null;
  //       }
  //     }

  //     const response = await httpClient.get("/api/auth/me", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     return response.data;
  //   } catch (error: any) {
  //     console.error("Error fetching user:", error);

  //     if (!localStorage.getItem("refreshToken")) {
  //       router.replace("/sign-in");
  //       return null;
  //     }

  //     try {
  //       const refreshResponse = await axios.post(
  //         "http://localhost:8080/api/auth/refresh",
  //         { refreshToken: localStorage.getItem("refreshToken") },
  //         { withCredentials: true }
  //       );

  //       localStorage.setItem("accessToken", refreshResponse.data.accessToken);
  //       localStorage.setItem("refreshToken", refreshResponse.data.refreshToken);

  //       return refreshResponse.data.user;
  //     } catch (refreshError) {
  //       console.error("Refresh token is invalid. Logging out...");
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("refreshToken");
  //       router.replace("/sign-in");
  //       return null;
  //     }
  //   }
  // }, [router]);

  const fetchUser = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("No access token found. User is not logged in.");
        router.replace("/sign-in");
        return null;
      }

      const response = await httpClient.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error fetching user:", error);

      try {
        // Автоматски refresh на accessToken со cookie
        const refreshResponse = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        return refreshResponse.data.user;
      } catch (refreshError) {
        console.error("Refresh token is invalid. Logging out...");
        localStorage.removeItem("accessToken");
        router.replace("/sign-in");
        return null;
      }
    }
  }, [router]);

  // const fetchUser = useCallback(async () => {
  //   try {
  //     const response = await httpClient.get("/api/auth/me");

  //     return response.data;
  //   } catch (error: any) {
  //     console.error("Error fetching user:", error);
  //     return null;
  //   }
  // }, []);

  const {
    data: user,
    error,
    mutate,
    isLoading,
  } = useSWR("/api/auth/me", fetchUser, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: true,
  });

  // const login = async ({
  //   onError,
  //   props,
  // }: {
  //   onError: (errors: HttpErrorResponse | undefined) => void;
  //   props: { email: string; password: string };
  // }) => {
  //   onError(undefined);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/auth/login",
  //       {
  //         email: props.email,
  //         password: props.password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     localStorage.setItem("accessToken", response.data.accessToken);
  //     localStorage.setItem("refreshToken", response.data.refreshToken);

  //     mutate();
  //   } catch (err) {
  //     const errors = err.response?.data as HttpErrorResponse;
  //     console.log("Login Error:", errors);

  //     if (errors?.status === 401) {
  //       errors.message = "Invalid email or password.";
  //     }

  //     onError(errors);
  //   }
  // };

  const login = async ({
    onError,
    props,
  }: {
    onError: (errors: HttpErrorResponse | undefined) => void;
    props: { email: string; password: string };
  }) => {
    onError(undefined);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: props.email,
          password: props.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Овозможува добивање на HTTP-only cookies
        }
      );

      localStorage.setItem("accessToken", response.data.accessToken); // Само accessToken-от се зачувува
      mutate();
    } catch (err) {
      const errors = err.response?.data as HttpErrorResponse;
      console.log("Login Error:", errors);

      if (errors?.status === 401) {
        errors.message = "Invalid email or password.";
      }

      onError(errors);
    }
  };

  const logout = useCallback(async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.removeItem("accessToken");
    //localStorage.removeItem("refreshToken");
    mutate();
    router.replace("/sign-in");
  }, [mutate, router]);

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }

    if (middleware === "auth" && error) {
      logout();
    }
  }, [user, error, logout, middleware, redirectIfAuthenticated, router]);

  return { user, login, mutate, logout, isLoading };
};
