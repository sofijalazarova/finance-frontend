import loginImage from "@/public/login.png";
import Image from "next/image";
import googleImage from "@/public/google.svg";
import { roboto } from "../layout";
import logo from "@/public/logo.png";
import Input from "@/app/_components/Input";

export const metadata = {
  title: "Register",
};

export default function Page() {
  return (
    <div
      class={`flex items-center justify-center min-h-screen bg-gray-100 ${roboto.className}`}
    >
      <div class="relative flex border border-vibrant-mint-green flex-col m-6 space-y-8 bg-white shadow-2xl  md:flex-row md:space-y-0">
        <div class="w-1/2 justify-center flex flex-col text-center md:p-32">
          <Image
            src={loginImage}
            alt="img"
            width={500}
            height={370}
            className="md:block"
          />

          <div class="right-6 p-6 bg-white rounded drop-shadow-md md:block">
            <span class="text-paragraph-green text-xl">
              Track your income, manage
              <br />
              expenses, and stay on top of your
              <br />
              budget effortlessly. Log in to take
              <br />
              control of your financial journey!
            </span>
          </div>
        </div>

        <div class="flex flex-col justify-center p-8 md:px-32 w-1/2 bg-pale-mint border border-l-vibrant-mint-green">
          <Image
            src={logo}
            alt="logo"
            width={290}
            height={290}
            className="mx-auto"
          />

          <div class="py-4">
            <span class="mb-2 text-md text-gray-600">Full name</span>
            <input
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              placeholder="Please enter your last name"
              id="lastName"
            />
          </div>
          <Input name="email" id="email" />
          <div class="py-4">
            <span class="mb-2 text-md text-gray-600">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="Please enter password"
              className="w-full p-3 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md text-gray-600">Repeat Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="Repeat password"
              className="w-full p-3 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>

          <button class="w-full bg-dark-teal-green text-white p-3 rounded-lg my-6  ">
            Sign up
          </button>
          <span class="text-center text-gray-400">
            ---------------------- or ----------------------
          </span>
          <button class="w-full border border-gray-300 text-md p-3 rounded-lg my-6 ">
            <Image
              src={googleImage}
              alt="img"
              width={23}
              height={23}
              className="inline mr-2"
            />
            Sign up with Google
          </button>
          <div class="text-center text-gray-400">
            Already have an account?
            <span class="font-bold text-gray-700"> Login here!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
