"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../utilitis/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const navigate = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Signup submit function
  const signUpSubmit = async (data) => {
    if (data.firstName && data.surName && data.email && data.password) {
      await axios
        .post(`${SERVER_URL}/user/signup`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status == "201") {
            toast.success("Signup successfully! Login now.");
            // Redirect user to Login page
            navigate.push("/login");
          } else if (res.data.status == "400") {
            toast.warn(res.data.message);
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
              <Link href="/login">
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
                <Link href="/" className="mb-3 block">
                  <img src="/img/logo.png" alt="logo" />
                </Link>
                <h1 className="text-[36px] text-white font-regular leading-[36px]">
                  Welcome to
                  <span className="text-[#00CFFF] font-bold"> K'nect</span>
                  {/* 00A400 */}
                  <span className="block">Create an account.</span>
                </h1>
              </div>

              <div className="md:mt-[24px] mb-6 py-3 w-[460px]">
                <div className="">
                  <form onSubmit={handleSubmit(signUpSubmit)} className="mt-1">
                    <label
                      className="text-white mb-[8px] text-[16px] font-regular "
                      htmlFor="name"
                    >
                      Full Name:
                    </label>
                    <input
                      {...register("firstName", { required: true })}
                      type="text"
                      id="name"
                      className="border rounded-[4px] px-[16px] py-2 block w-full mt-[4px] mb-[20px] focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] outline-none"
                      placeholder="Mr. Jon Day"
                    />
                    <p className="hidden">
                      {errors?.firstName &&
                        toast.error("Please provide your full name", {
                          toastId: customId,
                        })}
                    </p>
                    <label
                      className="text-white mb-[8px] text-[16px] font-regular "
                      htmlFor="email"
                    >
                      Email Address:
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      id="email"
                      className="border rounded-[4px] px-[16px] py-2 block w-full mt-[4px] mb-[20px] focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] outline-none"
                      placeholder="example@mail.com"
                    />
                    <p className="hidden">
                      {errors?.email &&
                        toast.error("Please provide a valid email address", {
                          toastId: customId,
                        })}
                    </p>

                    <label
                      className="mt-[24px] text-white mb-[8px] text-[16px] font-regular "
                      htmlFor="password"
                    >
                      Your Password:
                    </label>
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      className="border rounded-[4px] px-[16px] py-2 block w-full mt-[8px] mb-[8px] focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] outline-none"
                      placeholder="Password"
                      id="password"
                    />

                    <p className="hidden">
                      {errors?.password &&
                        toast.error("Password is required", {
                          toastId: customId,
                        })}
                    </p>

                    <button
                      type="submit"
                      className={`bg-[#00CFFF] hover:bg-[#13BCE3]  w-full text-white text-lg font-semibold rounded-[4px] px-8 py-2 mt-6 mb-3 w-full`}
                    >
                      Sign Up
                    </button>
                  </form>

                  <div className="flex gap-2 items-center"></div>
                  <div className="md:flex mt-2 items-center justify-between gap-1">
                    <div className="flex gap-1">
                      <span className="font-regular text-white">
                        Already registered?
                      </span>
                      <Link
                        href="/login"
                        className="text-[#00CFFF] font-regular "
                      >
                        login now
                      </Link>
                    </div>
                  </div>
                  <hr className="mt-[20px]" />
                  <div className="text-dark bg-white font-semibold cursor-pointer flex gap-4 items-center justify-center rounded-[4px] px-8 py-2.5 mt-6 mb-3 w-full text-center">
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
                    <span>Signup with Google</span>
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
