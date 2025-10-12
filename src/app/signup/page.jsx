"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../utilitis/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Flex, Spin } from "antd";
import { useState, useRef } from "react";

export default function SignupPage() {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedImg, setSelectedImg] = useState("");
  const fileInputRef = useRef();

  // image bb upload apis
  const imgbbKey = "aefb8bb9063d982e8940fd31a2d29f9d";
  const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
  let imgUrl;

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      console.log();
      const file = URL.createObjectURL(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setSelectedImg(file);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Signup submit function
  const signUpSubmit = async (data) => {
    // return
    setLoading(true);

    // Upload image into imgbb
    const img = fileInputRef.current.files[0];
    if (img) {
      let formData = new FormData();
      formData.append("image", img);
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          imgUrl = data.data.url;
        });
    }



    // Sending data to the server
    if (data.fullName && data.email && data.password) {
      await axios
        .post(
          `${SERVER_URL}/user/signup`,
          {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            imgUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.status == "201") {
            toast.success("Signup successfully! Login now.");
            // Redirect user to Login page
            navigate.push("/login");
          } else if (res.data.status == "400") {
            toast.warn(res.data.message);
            // Redirect user to Login page
            navigate.push("/login");
          }
        })
        .catch((err) => {
          toast.error("Something wrong. Try again");
          setLoading(false);
        });
    }
    reset();
    setSelectedImg('')
    setLoading(false);
  };

  // Custom id for tostify
  const customId = "custom-id-yes";

  return (
    <div className="">
      <div className="md:ml-[100px] md:mx-0 mx-[16px]">
        {/* MASS BG */}
        {/* <div className="mass-bg">
            <div className="absolute inset-0 justify-center">
              <div className="bg-shape1 bg-primary opcity-50 bg-blur"></div>
              <div className="bg-shape2 bg-teal opcity-50 bg-blur"></div>
              <div className="bg-shape3 bg-purple opcity-50 bg-blur"></div>
            </div>
          </div> */}
        <div className="md:mt-12 mt-7 gap-6">
          <div className="md:flex flex-cols-2 gap-6 md:gap-20 justify-between items-center">

            {/* SIGNUP MAIN LEFT SECTION */}
            <div className="">
              <Link href="/login">
                <div className="bg-[#203A43] w-[56px] h-[40px] flex justify-center items-center rounded-[8px] mb-6 md:mb-12">
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
                <h1 className="text-[32px] md:text-[36px] text-white font-regular leading-[38px]">
                  Welcome to
                  <span className="text-[#00CFFF] font-bold"> K&#39;nect</span>
                  {/* 00A400 */}
                  <span className="block">Create an account.</span>
                </h1>
              </div>

              <div className="md:mt-[24px] mb-6 py-3 w-[100%] md:w-[460px]">
                <div className="">
                  <form onSubmit={handleSubmit(signUpSubmit)} className="mt-1">
                    <label
                      className="text-white text-[16px] font-light "
                      htmlFor="name"
                    >
                      Full Name:
                    </label>
                    <input
                      {...register("fullName", { required: true })}
                      type="text"
                      id="name"
                      className="border rounded-[4px] px-[16px] py-2 block w-full mt-[8px] mb-[24px] placeholder:font-light focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] outline-none"
                      placeholder="Mr. Jon Day"
                    />
                    <p className="hidden">
                      {errors?.fullName &&
                        toast.error("Please provide your full name", {
                          toastId: customId,
                        })}
                    </p>
                    <label
                      className="text-white mb-[8px] text-[16px] font-light "
                      htmlFor="email"
                    >
                      Email Address:
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      id="email"
                      className="border rounded-[4px] px-[16px] py-2 block w-full mt-[8px] mb-[24px] placeholder:font-light focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] outline-none"
                      placeholder="example@mail.com"
                    />
                    <p className="hidden">
                      {errors?.email &&
                        toast.error("Please provide a valid email address", {
                          toastId: customId,
                        })}
                    </p>

                    <label
                      className="text-white text-[16px] font-light "
                      htmlFor="password"
                    >
                      Your Password:
                    </label>

                    {/* Password field with hide show password toggle */}
                    <div className="relative">
                      <input
                        {...register("password", { required: true })}
                        type={showPassword ? "text" : "password"}
                        className="border rounded-[4px] px-[16px] py-2 block w-full mb-[10px] mt-[8px] placeholder:font-light focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] outline-none relative"
                        placeholder="Password"
                        id="password"
                      />
                      {showPassword ? (
                        <svg
                          onClick={() => setShowPassword(!showPassword)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 36 36"
                          className="absolute top-[50%] cursor-pointer -translate-y-1/2 right-[3%] text-gray-700"
                        >
                          <path
                            fill="currentColor"
                            d="M33.62 17.53c-3.37-6.23-9.28-10-15.82-10S5.34 11.3 2 17.53l-.28.47l.26.48c3.37 6.23 9.28 10 15.82 10s12.46-3.72 15.82-10l.26-.48Zm-15.82 8.9C12.17 26.43 7 23.29 4 18c3-5.29 8.17-8.43 13.8-8.43S28.54 12.72 31.59 18c-3.05 5.29-8.17 8.43-13.79 8.43"
                            class="clr-i-outline clr-i-outline-path-1"
                          />
                          <path
                            fill="currentColor"
                            d="M18.09 11.17A6.86 6.86 0 1 0 25 18a6.86 6.86 0 0 0-6.91-6.83m0 11.72A4.86 4.86 0 1 1 23 18a4.87 4.87 0 0 1-4.91 4.89"
                            class="clr-i-outline clr-i-outline-path-2"
                          />
                          <path fill="none" d="M0 0h36v36H0z" />
                        </svg>
                      ) : (
                        <svg
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-[50%] cursor-pointer -translate-y-1/2 right-[3%] text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 36 36"
                        >
                          <rect width="36" height="36" fill="none" />
                          <path
                            fill="currentColor"
                            d="M25.19 20.4a6.8 6.8 0 0 0 .43-2.4a6.86 6.86 0 0 0-6.86-6.86a6.8 6.8 0 0 0-2.37.43L18 13.23a5 5 0 0 1 .74-.06A4.87 4.87 0 0 1 23.62 18a5 5 0 0 1-.06.74Z"
                            class="clr-i-outline clr-i-outline-path-1"
                            stroke-width="0"
                            stroke="currentColor"
                          />
                          <path
                            fill="currentColor"
                            d="M34.29 17.53c-3.37-6.23-9.28-10-15.82-10a16.8 16.8 0 0 0-5.24.85L14.84 10a14.8 14.8 0 0 1 3.63-.47c5.63 0 10.75 3.14 13.8 8.43a17.8 17.8 0 0 1-4.37 5.1l1.42 1.42a19.9 19.9 0 0 0 5-6l.26-.48Z"
                            class="clr-i-outline clr-i-outline-path-2"
                            stroke-width="0"
                            stroke="currentColor"
                          />
                          <path
                            fill="currentColor"
                            d="m4.87 5.78l4.46 4.46a19.5 19.5 0 0 0-6.69 7.29l-.26.47l.26.48c3.37 6.23 9.28 10 15.82 10a16.9 16.9 0 0 0 7.37-1.69l5 5l1.75-1.5l-26-26Zm9.75 9.75l6.65 6.65a4.8 4.8 0 0 1-2.5.72A4.87 4.87 0 0 1 13.9 18a4.8 4.8 0 0 1 .72-2.47m-1.45-1.45a6.85 6.85 0 0 0 9.55 9.55l1.6 1.6a14.9 14.9 0 0 1-5.86 1.2c-5.63 0-10.75-3.14-13.8-8.43a17.3 17.3 0 0 1 6.12-6.3Z"
                            class="clr-i-outline clr-i-outline-path-3"
                            stroke-width="0"
                            stroke="currentColor"
                          />
                          <path fill="none" d="M0 0h36v36H0z" />
                        </svg>
                      )}
                    </div>

                    <p className="hidden">
                      {errors?.password &&
                        toast.error("Password is required", {
                          toastId: customId,
                        })}
                    </p>

                    {/* Updaload option */}
                    <div className="mt-[20px]">
                      <label
                        className="text-white text-[16px] font-light "
                        htmlFor="image"
                      >
                        Upload your profile picture (Optional):
                      </label>
                      <button
                        className="w-full h-[60px] md:h-[72px] bg-[#f6f6f6] rounded-md flex flex-col mt-[8px] justify-center items-center border-2 border-dotted border-[#f6f6f6] hover:border-gray-400 transition text-center mr-4 gap-1"
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5 3h13a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v11.59l4.29-4.3l2.5 2.5l5-5L20 16V6a2 2 0 0 0-2-2zm4.79 13.21l-2.5-2.5L3 19a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-1.59l-5.21-5.2zM7.5 6A2.5 2.5 0 0 1 10 8.5A2.5 2.5 0 0 1 7.5 11A2.5 2.5 0 0 1 5 8.5A2.5 2.5 0 0 1 7.5 6m0 1A1.5 1.5 0 0 0 6 8.5A1.5 1.5 0 0 0 7.5 10A1.5 1.5 0 0 0 9 8.5A1.5 1.5 0 0 0 7.5 7"
                          />
                        </svg>
                        <span className="text-[16px] font-light">
                          Click to Upload
                        </span>
                      </button>

                      <input
                        type="file"
                        {...register("image", { required: false })}
                        ref={fileInputRef}
                        id="image"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>

                    {/* Preview image */}
                    <div className="">
                      {selectedImg && (
                        <div className="w-[66px] h-[70px] mt-[20px] rounded-md  relative">
                          <button
                            className="w-[24px] absolute top-0 right-0 h-[24px] bg-[#f1f1f1] hover:bg-[#f6f6f6] rounded-md flex justify-center items-center border border-[#f6f6f6] hover:border-[#ddd] transition text-center"
                            onClick={() => {
                              setSelectedImg("");
                              setFileName("No file chosen");
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              className="rotate-45 text-center pl-[2px] text-[#]"
                            >
                              <path
                                fill="currentColor"
                                d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z"
                              />
                            </svg>
                          </button>
                          <img
                            src={selectedImg}
                            className="w-full h-full rounded"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={`${
                        loading
                          ? "bg-[#f9f9f9] cursor-not-allowed"
                          : "bg-[#00CFFF] hover:bg-[#13BCE3]"
                        } hover:bg-[#00CFeef] w-full text-white text-lg font-semibold rounded-[4px] px-8 py-2 mt-[32px] mb-[8px] w-full`}
                      disabled={loading}
                    >
                      {loading ? <Spin /> : "Sign Up"}
                    </button>
                  </form>

                  <div className="flex gap-2 items-center"></div>
                  <div className="md:flex mt-2 items-center justify-between gap-1">
                    <div className="flex gap-1 font-light text-[16px]">
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
                  {/* <hr className="my-[28px]" />
                  <div className="text-dark bg-white font-regular cursor-pointer flex gap-4 items-center justify-center rounded-[4px] px-8 py-2.5 mb-3 w-full text-center">
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
                  </div> */}
                </div>
              </div>
            </div>

            {/* VERTICAL LINE */}
            <hr className="w-[.2px] hidden md:block min-h-[80vh] bg-[#F4F4F9]" />
            {/* RIGHT IMAGE */}
            <div>
              <img className="md:w-[460px] hidden md:block" src="/img/bg-img.png" alt="login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
