import { useRouter } from "next/navigation";
import useSWR from 'swr';
import httpClient from "../httpClient";
import { useEffect } from "react";

interface AuthProps {
    middleware?: "auth" | "guest";
    redirectIfAuthenticated?: string
}

export const useAuthGuard = ({
    middleware,
    redirectIfAuthenticated,
}: AuthProps) => {

    const router = useRouter();

    const fetchUser = async () => {
        try{
            const token = localStorage.getItem("token");
            if(!token) throw new Error("No token found");
            const response = await httpClient.get("/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error){
            console.error("Error");
            throw error;
        }
    }


    const {data: user, error, mutate} = useSWR("/api/auth/me", fetchUser, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false
    });

    const login = async ({
        onError,
        props,
    }: {
        onError: (errors: HttpErrorResponse | undefined) => void;
        props: {email: string; password: string};
    }) => {
        onError(undefined);
        try{
            const response = await httpClient.post<{token: string}>("/api/auth/authenticate",{
                email: props.email,
                password: props.password,
            });

            console.log(response);

            const token = response.data.token;
            localStorage.setItem("token",token);
            console.log("Login Successful");
            mutate();

        }catch(err){
            const errors = err.response?.data as HttpErrorResponse;
            console.log("Login Error:", errors);
            onError(errors);
        }
    }

    const isHttpErrorResponse = (error: unknown): error is HttpErrorResponse => {
        return (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as any).response === "object"
        );
      };


    useEffect(() => {
        if (middleware === "guest" && redirectIfAuthenticated && user?.id) {
          console.log("Redirecting to:", redirectIfAuthenticated);
          router.replace(redirectIfAuthenticated);
        } else if (middleware === "auth" && error) {
          if (isHttpErrorResponse(error)) {
            console.error("Authentication error details:", error);
          } else {
            console.error("Unknown error type:", error);
          }
          
        }
      }, [middleware, redirectIfAuthenticated, user, error]);


      return {user, login, mutate};

}