"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../utilitis/SERVER_URL";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { Flex, Spin } from "antd";

export default function LoginPage() {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Login submit function
  const loginSubmit = async (data) => {
    setLoading(true)
    if (data.email && data.password) {
      console.log(data)
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
            setLoading(false);
          } 
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setLoading(false);
        });
    }

    reset();
  };

  // Custom id for tostify
  const customId = "custom-id-yes";

  return (
    <div className="">
      <div className="ml-[100px] mx-auto">
        {/* MASS BG */}
        {/* <div className="mass-bg">
        <div className="absolute inset-0 justify-center">
          <div className="bg-shape1 bg-primary opcity-50 bg-blur"></div>
          <div className="bg-shape2 bg-teal opcity-50 bg-blur"></div>
          <div className="bg-shape3 bg-purple opcity-50 bg-blur"></div>
        </div>
      </div> */}
        <div className="mt-12 gap-6">
          <div className="flex flex-cols-2 gap-6 md:gap-20  justify-between items-center">
            <div className="">
              <Link href="/">
                <div className="bg-[#203A43] w-[56px] h-[40px] flex justify-center items-center rounded-[8px] mb-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    className="text-white rotate-[-90deg]"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.5 7.5l-4-4l-4.029 4m4.029-4v13"
                      stroke-width="1"
                    />
                  </svg>
                </div>
              
              
              </Link>
              <div>
                {/* <img src="/img/logo.png" alt="" /> */}
                <Link href="/">
                  <img src="/img/logo.png" alt="logo" />
                </Link>
                <h1 className="text-[36px] text-white font-regular ">
                  Login to
                  <span className="text-[#00CFFF] font-bold"> K&#39;nect</span>
                  {/* 00A400 */}
                </h1>
              </div>

              <div className="md:mt-[24px] mb-6 py-3 w-[460px]">
                <div className="">
                  <form onSubmit={handleSubmit(loginSubmit)} className="mt-1">
                    <label
                      className="text-white text-[16px] font-light "
                      htmlFor="email"
                    >
                      Email Address:
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="text"
                      id="email"
                      className="border rounded-[4px] px-[16px] py-2 block w-full mt-[8px] mb-[24px] placeholder:font-light focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] outline-none"
                      placeholder="example@gmail.com"
                    />
                    <p className="hidden">
                      {errors?.email &&
                        toast.error("Email is required", {
                          toastId: customId,
                        })}
                    </p>

                    <label
                      className="mt-[24px] text-white text-[16px] font-light "
                      htmlFor="password"
                    >
                      Password:
                    </label>
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      className="border rounded-[4px] px-[16px] py-2 block w-full mb-[10px] mt-[8px] placeholder:font-light focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] outline-none"
                      placeholder="Password"
                      id="password"
                    />
                    <div className="flex gap-1 text-[16px] font-light mt-[8px]">
                      <span className="font-regular text-white">
                        Forgotten password?
                      </span>
                      <Link
                        href="/forgot"
                        className="text-[16px] text-[#00CFFF] font-regular"
                      >
                        reset now
                      </Link>
                    </div>

                    <p className="hidden">
                      {errors?.password &&
                        toast.error("Password is required", {
                          toastId: customId,
                        })}
                    </p>

                    <button
                      type="submit"
                      className={`${
                        loading
                          ? "bg-gray-300"
                          : "bg-[#00CFFF] hover:bg-[#13BCE3]"
                      } hover:bg-[#00CFeef] w-full text-white text-lg font-semibold rounded-[4px] px-8 py-2 mt-6 mb-[8px] w-full`}
                    >
                      {loading ? <Spin /> : "Login"}
                    </button>
                  </form>

                  <div className="flex gap-2 items-center"></div>
                  <div className="md:flex mt-[8px] items-center justify-between gap-1">
                    <div className="flex gap-1 text-[16px] font-light">
                      <span className="font-regular text-white">
                        Don&#39;t have account?
                      </span>
                      <Link
                        href="/signup"
                        className="text-[#00CFFF] font-regular "
                      >
                        create now
                      </Link>
                    </div>
                  </div>
                  <hr className="my-[28px]" />
                  <div className="text-dark bg-white font-semibold cursor-pointer flex gap-4 items-center justify-center rounded-[4px] px-8 py-2.5 mb-3 w-full text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 16 16"
                    >
                      <g fill="none" fill-rule="evenodd" clip-rule="evenodd">
                        <path
                          fill="#f44336"
                          d="M7.209 1.061c.725-.081 1.154-.081 1.933 0a6.57 6.57 0 0 1 3.65 1.82a100 100 0 0 0-1.986 1.93q-1.876-1.59-4.188-.734q-1.696.78-2.362 2.528a78 78 0 0 1-2.148-1.658a.26.26 0 0 0-.16-.027q1.683-3.245 5.26-3.86"
                          opacity="0.987"
                        />
                        <path
                          fill="#ffc107"
                          d="M1.946 4.92q.085-.013.161.027a78 78 0 0 0 2.148 1.658A7.6 7.6 0 0 0 4.04 7.99q.037.678.215 1.331L2 11.116Q.527 8.038 1.946 4.92"
                          opacity="0.997"
                        />
                        <path
                          fill="#448aff"
                          d="M12.685 13.29a26 26 0 0 0-2.202-1.74q1.15-.812 1.396-2.228H8.122V6.713q3.25-.027 6.497.055q.616 3.345-1.423 6.032a7 7 0 0 1-.51.49"
                          opacity="0.999"
                        />
                        <path
                          fill="#43a047"
                          d="M4.255 9.322q1.23 3.057 4.51 2.854a3.94 3.94 0 0 0 1.718-.626q1.148.812 2.202 1.74a6.62 6.62 0 0 1-4.027 1.684a6.4 6.4 0 0 1-1.02 0Q3.82 14.524 2 11.116z"
                          opacity="0.993"
                        />
                      </g>
                    </svg>
                    <span>Login with Google</span>
                  </div>
                  <div className="mt-8 text-right"></div>
                </div>
              </div>
            </div>
            <hr className="w-[.2px] min-h-[80vh] bg-[#F4F4F9]" />
            <div>
              <img className="w-[460px]" src="/img/bg-img.png" alt="login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
