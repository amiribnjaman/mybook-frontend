"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../utilitis/SERVER_URL";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const navigate = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Login submit function
  const loginSubmit = async (data) => {
    if (data.email && data.password) {
      await axios
        .post(`${SERVER_URL}/user/login`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status == '200') {
            localStorage.setItem('userId', res.data.userId)
            setCookie("Token", res.data.token);
            toast.success(res.data.message);
            // Redirect user to Home page
            navigate.push("/");
          } else if (res.data.status == "401" || res.data.status == "404") {
            toast.error(res.data.message);
          } 
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }

    reset();
  };

  // Custom id for tostify
  const customId = "custom-id-yes";

  return (
    <div className="md:w-[80%] w-[95%] mx-auto">
      {/* MASS BG */}
      <div className="mass-bg">
        <div className="absolute inset-0 justify-center">
          <div className="bg-shape1 bg-primary opcity-50 bg-blur"></div>
          <div className="bg-shape2 bg-teal opcity-50 bg-blur"></div>
          <div className="bg-shape3 bg-purple opcity-50 bg-blur"></div>
        </div>
      </div>
      <div className="mt-20 gap-6">
        <div className="">
          <h1 className="text-center">
            <span className="text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 from-10% to-emerald-500 to-90%">
              Welcome Back
            </span>
            
            {/* 00A400 */}
          </h1>
          <h5 className="text-[13px] text-center text-slate-600">
            We serve love. We connect with your beloved one.
          </h5>
          <div className="mt-2 mb-6 py-3 ">
            <div className="">
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
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-l w-full text-white text-lg font-semibold rounded-md px-8 py-2 mt-6 mb-3 w-full"
                >
                  Login
                </button>
              </form>

              <div className="flex gap-2 items-center">
                <div className="h-[1px] bg-slate-100 w-[45%]"></div>
                <p>or</p>
                <div className="h-[1px] bg-slate-100 w-[45%]"></div>
              </div>
              <div className="md:flex mt-2 items-center justify-between gap-1">
                <div className="flex gap-1">
                  <span className="font-semibold">
                    New to <span className="text-green-500">Mybook</span>?
                  </span>
                  <Link
                    href="/signup"
                    className="text-black font-semibold rounded-md underline "
                  >
                    Create an Account
                  </Link>
                </div>
                <Link
                  href="/forgot"
                  className="text-[13px] text-blue-700 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="mt-8 text-right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
