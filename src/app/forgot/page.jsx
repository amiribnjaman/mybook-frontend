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

      reset()
    } else if (data.email){
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
      <div className="w-[60%] mx-auto my-6 py-3 border rounded-md">
        <h3 className="text-[18px] font-semibold">
          {showPassField ? "Reset your password" : "Submit your Email"}
        </h3>
        <div className="mx-6">
          <form onSubmit={handleSubmit(forgotPassSubmit)} className="mt-1">
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
            {showPassField && (
              <>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="border rounded-md p-2 block w-full mt-3"
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
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-l w-full text-white text-lg font-semibold rounded-md px-8 py-2 mt-6 mb-3 w-full"
            >
              Submit
            </button>
          </form>
          <Link
            href="/login"
            className="underline text-black text-md font-semibold rounded-md px-4 block text-left mt-3 mb-2"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
