"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../utilitis/SERVER_URL";
import { useState } from "react";

export default function LoginPage() {
  const [showPassField, setShowPassField] = useState(false);
  const navigate = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Forgot password mail check submit function
  const forgotPassSubmit = async (data) => {
    if (data.email && data.password) {
      await axios
        .patch(`${SERVER_URL}/user/password-reset`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status == 201) {
            setShowPassField(false);
            toast.success(res.data.message);
            // Redirect user to Login page
            navigate.push("/login");
          } else if (res.data.status == 401) {
            toast.error("Email is invalid");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong. Try again.");
        });

      reset();
    } else if (data.email) {
      await axios
        .post(`${SERVER_URL}/user/forgot-pass-check`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            setShowPassField(true);
            toast.success(res.data.message);
          } else if (res.data.status == 401) {
            toast.error("Email is invalid");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  };

  // Custom id for tostify
  const customId = "custom-id-yes";

  return (
    <div className="text-center mt-8 w-full">
      {/* <h1 className="text-[40px] text-center font-bold text-[#0866FF]">
        Mybook
      </h1> */}
      <div className="w-[400px] mx-auto my-[80px] py-3 border rounded-md bg-white shadow">
        <div className="mx-6 my-6">
          <form onSubmit={handleSubmit(forgotPassSubmit)} className="mt-1">
            <h5 className="text-dark text-[18px] font-light text-left">
              {showPassField ? "Reset your password" : "Submit your Email"}
            </h5>
            <input
              {...register("email", { required: true })}
              type="email"
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
            {showPassField && (
              <>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="border rounded-[4px] px-[16px] py-2 block w-full mt-[8px] mb-[24px] placeholder:font-light focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] outline-none"
                  placeholder="Set new Password"
                />
                <p className="hidden">
                  {errors?.password &&
                    toast.error("Password is required", {
                      toastId: customId,
                    })}
                </p>
              </>
            )}

            <button
              type="submit"
              className="bg-[#00CFFF] hover:bg-[#13BCE3] w-full text-white text-lg font-semibold rounded-md px-8 py-2 mt-3 mb-3 w-full"
            >
              Submit
            </button>
          </form>
          <Link
            href="/login"
            className="text-[16px] underline font-light text-black block text-left mt-3 mb-2"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
