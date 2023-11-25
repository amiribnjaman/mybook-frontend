'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SignupPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Signup submit function
  const signUpSubmit = (data) => {
    console.log(data)

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
        <h3 className="text-2xl font-semibold"> Create a new account </h3>
        <h5> It's quick and easy.</h5>
        <hr className="my-2" />
        <div className="mx-6">
          <form onSubmit={handleSubmit(signUpSubmit)} className="mt-1">
            <div className="flex justify-between gap-2">
              <input
                {...register("firstName", { required: true })}
                type="text"
                className="border rounded-md p-2 w-1/2"
                placeholder="Firstname"
              />
              <p className="hidden">
                {errors?.firstName &&
                  toast.error("First Name field is required", {
                    toastId: customId,
                  })}
              </p>
              <input
                {...register("surName", { required: true })}
                type="text"
                className="border rounded-md p-2 w-1/2"
                placeholder="Surname"
              />
              <p className="hidden">
                {errors?.surName &&
                  toast.error("Surname Name field is required", {
                    toastId: customId,
                  })}
              </p>
            </div>
            <input
              {...register("email", { required: true })}
              type="text"
              className="border rounded-md p-2 block w-full mt-3"
              placeholder="Email Address"
            />
            <p className="hidden">
              {errors?.email &&
                toast.error("Email field is required", {
                  toastId: customId,
                })}
            </p>
            <input
              {...register("password", { required: true })}
              type="password"
              className="border rounded-md p-2 block w-full mt-3"
              placeholder="New Password"
            />
            <p className="hidden">
              {errors?.password &&
                toast.error("Password Name field is required", {
                  toastId: customId,
                })}
            </p>
            <p className="text-[12px] text-slate-500 mt-4 text-left mb-3">
              People who use our service may have uploaded your contact
              information to Facebook. Learn more.
            </p>
            <p className="text-[12px] text-slate-500 text-left">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <button
              type="submit"
              className="bg-[#00A400] text-white text-lg font-semibold rounded-md px-8 py-2 mt-6 mb-3"
            >
              Signup
            </button>
          </form>
          <Link href="/login" className="text-[#0866FF] font-semibold">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
