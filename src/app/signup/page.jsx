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
    <div className="text-center w-full mt-8 w-full">
      <h1 className="text-[40px] text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 from-10% via-sky-400 via-40% to-emerald-500 to-60%">
        {/* 00A400 */}
        Mybook
      </h1>
      <h5 className="text-[13px] text-slate-600">
        We serve love. We connect with your beloved one.
      </h5>
      <div className="w-[60%] mx-auto mt-3 mb-6 py-3 ">
        {/* <h3 className="text-2xl font-semibold"> Welcome to Mybook </h3> */}

        <div className="mx-6">
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
              className="border rounded-md p-2 block w-full mt-3"
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
              className="border rounded-md p-2 block w-full mt-3"
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
                toast.error("Email field is required", { toastId: customId })}
            </p>

            {/* Password field */}
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="border rounded-md p-2 block w-full mt-3"
              placeholder="New Password"
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
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-l  text-white text-lg font-semibold rounded-md px-8 py-2 mt-6 mb-3 w-full"
            >
              Signup
            </button>
          </form>
          <p>or</p>
          <Link
            href="/login"
            className="text-dark text-[14px] underline font-semibold"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
