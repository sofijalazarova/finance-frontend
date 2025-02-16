"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import googleImage from "@/public/google.svg";
import Logo from "@/public/logo.png";
import { useAuthGuard } from "@/lib/auth/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthForm({ type }: { type: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<HttpErrorResponse | undefined>(
    undefined
  );

  const router = useRouter();

  const { login } = useAuthGuard({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        await axios.post("http://localhost:8080/api/auth/register", data);
        toast.success("Registration completed. Please login!");
        router.replace("/sign-in");
      }

      if (type === "sign-in") {
        console.log(data);

        login({
          onError: (errors) => {
            setErrors(errors);
            if (errors) {
              console.log("Authentication failed");
              setIsLoading(false);
            }
          },
          props: data,
        });
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <section className="w-96">
      <header>
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            width={290}
            height={290}
            className="mx-auto"
          />
        </Link>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          {type === "sign-up" && (
            <>
              <div className="flex gap-4">
                <CustomInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <CustomInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </div>
            </>
          )}

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-dark-teal-green text-white p-3 rounded-lg my-6 hover:bg-bright-leaf-green transition-all duration-300 ease-in-out cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} />
                  Loading...
                </>
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>

            <div className="flex items-center text-gray-400">
              <span className="flex-grow border-t border-gray-300"></span>
              <span className="px-4 text-center text-gray-400">or</span>
              <span className="flex-grow border-t border-gray-300"></span>
            </div>
            <Link href="http://localhost:8080/oauth2/authorization/google">
              <button className="w-full border border-gray-300 text-md p-3 rounded-lg my-6 ">
                <Image
                  src={googleImage}
                  alt="img"
                  width={23}
                  height={23}
                  className="inline mr-2"
                />
                {type === "sign-up"
                  ? "Sign up with Google"
                  : "Sign in with Google"}
              </button>
            </Link>
            <div className="text-center text-gray-400">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
                <span className="font-bold text-gray-700 ml-1">
                  {type === "sign-in" ? "Register here!" : "Login here!"}
                </span>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
