"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../../SERVER_URL";

export default function LoginPage() {
    const navigate = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Login submit function
  const loginSubmit = async (data) => {
    console.log(data);
    if (data.email && data.password) {
      await axios
        .post(`${SERVER_URL}/user/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res)
          if (res.data.status == 200) {
            localStorage.setItem('Token', res.data.token)
            toast.success(res.data.message);
            // Redirect user to Home page
            navigate.push("/");
          } else if (res.data.status == 401) {
            toast.error("Email or password is Invalid");
          }
        })
        .catch((err) => {
          toast.error("Something wrong. Try again");
        });
    }

    reset();
  };

  // Custom id for tostify
  const customId = "custom-id-yes";

  return (
    <div className="text-center mt-8 w-full">
      <h1 className="text-[40px] text-center font-bold text-[#0866FF]">
        Mybook
      </h1>
      <div className="w-[60%] mx-auto my-6 py-3 border shadow-md rounded-md">
        <h3 className="text-xl"> Log in to Mybook </h3>
        <hr className="my-2" />
        <div className="mx-6">
          <form onSubmit={handleSubmit(loginSubmit)} className="mt-1">
            <input
              {...register("email", { required: true })}
              type="text"
              className="border rounded-md p-2 block w-full mt-3"
              placeholder="Email Address"
            />
            <p className="hidden">
              {errors?.email &&
                toast.error("Email is required", {
                  toastId: customId,
                })}
            </p>
            <input
              {...register("password", { required: true })}
              type="password"
              className="border rounded-md p-2 block w-full mt-3"
              placeholder="Password"
            />
            <p className="hidden">
              {errors?.password &&
                toast.error("Password is required", {
                  toastId: customId,
                })}
            </p>

            <button
              type="submit"
              className="bg-[#0866FF] w-full text-white text-lg font-semibold rounded-md px-5 py-1 mt-6 mb-3"
            >
              Login
            </button>
          </form>
          <div className="flex gap-2 items-center">
            <div className="h-[1px] bg-slate-100 w-[45%]"></div>
            <p>or</p>
            <div className="h-[1px] bg-slate-100 w-[45%]"></div>
          </div>
          <Link
            href="/signup"
            className="bg-[#00A400] text-white text-lg font-semibold rounded-md px-8 inline-block py-2 mt-6 mb-3"
          >
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}
