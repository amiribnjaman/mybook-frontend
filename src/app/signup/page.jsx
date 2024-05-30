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
      {/* MASS BG */}
      <div className="absolute">
        <div className="absolute inset-0 justify-center">
          <div className="bg-shape1 bg-primary opcity-50 bg-blur"></div>
          <div className="bg-shape2 bg-teal opcity-50 bg-blur"></div>
          <div className="bg-shape3 bg-purple opcity-50 bg-blur"></div>
        </div>
      </div>
      <div className="w-full mt-20 flex gap-6">
        <div className="w-[50%]">
          <h1>
            <span className="text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 from-10% to-emerald-500 to-90%">
              Mybook
            </span>
          </h1>
          <h5 className="text-[13px] text-slate-600">
            We serve love. We connect with your beloved one.
          </h5>
          <div className="mt-2 mb-6 py-3 ">
            <div className="md:mr-6">
              <form onSubmit={handleSubmit(signUpSubmit)} className="mt-1">
                {/* Firstname field */}
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  className="border rounded-md p-2 block w-full mt-3"
                  placeholder="Firstname"
                />
                {/* Firstname error */}
                <p className="hidden">
                  {errors?.firstName &&
                    toast.error("First Name field is required", {
                      toastId: customId,
                    })}
                </p>

                {/* Surname field */}
                <input
                  {...register("surName", { required: true })}
                  type="text"
                  className="border rounded-md p-2 block w-full mt-2"
                  placeholder="Surname"
                />
                {/* Surname Error */}
                <p className="hidden">
                  {errors?.surName &&
                    toast.error("Surname Name field is required", {
                      toastId: customId,
                    })}
                </p>

                {/* Email field */}
                <input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    },
                  })}
                  type="text"
                  className="border rounded-md p-2 block w-full mt-2"
                  placeholder="Email Address"
                />
                {/* Email errors */}
                <p className="hidden">
                  {errors.email?.type === "pattern" &&
                    toast.error(
                      `Invalid email. Please provide a valid email address.`,
                      {
                        toastId: customId,
                      }
                    )}
                </p>
                <p className="hidden">
                  {errors?.email &&
                    toast.error("Email field is required", {
                      toastId: customId,
                    })}
                </p>

                {/* Password field */}
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  type="password"
                  className="border rounded-md p-2 block w-full mt-2"
                  placeholder="Your Password"
                />
                {/* Password errors */}
                <p className="hidden">
                  {errors.password?.type === "minLength" &&
                    toast.error(
                      `Password is too short. 
                Please provide atleast 6 characters.`,
                      {
                        toastId: customId,
                      }
                    )}
                </p>
                <p className="hidden">
                  {errors?.password &&
                    toast.error("Password field is required", {
                      toastId: customId,
                    })}
                </p>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-l text-white text-lg font-semibold rounded-md px-8 py-2 mt-6 mb-3 w-full"
                >
                  Signup
                </button>
              </form>
              <p className="text-[15px]">
                or
                <span className="inlie-block ml-2 font-semibold">Already Signup?</span>
                <Link
                  href="/login"
                  className="text-dark text-[15px] ml-1 underline font-semibold"
                >
                  Login Now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/*RIGHTSIDE*/}
        <div className="SIGNUP_RIGHT_SIDE w-[50%]">
          <div className="text-left">
            <h1 className="text-md font-semibold mt-10">
              About
              <span className="text-green-500 ml-1">Mybook</span>
            </h1>
            <p className="text-[14px] mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries,
            </p>
            <h2 className="font-semibold">Features</h2>
            <ul className="list-disc text-[14px] ml-4 mt-1">
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
