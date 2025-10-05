"use client";
import axios from "axios";
import { SERVER_URL } from "../utilitis/SERVER_URL";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useEffect, useState, useRef } from "react";

export default function CreatePostCard({
  createPostCard,
  setCreatePostCard,
  reload,
  setReload,
}) {

  // image bb upload apis
  const imgbbKey = "aefb8bb9063d982e8940fd31a2d29f9d";
  const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
  let postImgUrl;

  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);

  const [fileName, setFileName] = useState("No file chosen");
  const [selectedImg, setSelectedImg] = useState("");
  const fileInputRef = useRef();
  const [postCategory, setPostCategory] = useState("");

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

  console.log("top", fileName);

  // Handle post submit
  const handlePostSubmit = async (d) => {
    setPostCategory(postCategory || "Post");
    const { postTitle, postContent } = d;

    // console.log("hello inside", postTitle, postContent, postCategory);
    // return

    const userId = localStorage.getItem("userId");

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
          postImgUrl = data.data.url;
        });
    }

    // console.log("img url", img, postImgUrl);
    const data = {
      userId,
      postTitle,
      postContent,
      postCategory,
      postImgUrl,
    };

    console.log(img && postTitle && postContent)
    // POST DATA INTO SERVER
    if (img && postTitle && postContent) {
      console.log('server code',)
      await axios
        .post(`${SERVER_URL}/post/create`, data, {
          headers: {
            authorization: "Bearer " + cookies.Token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status == 201) {
            setReload(!reload);
            console.log(res.data.message);
            setCreatePostCard(!createPostCard);
            toast.success("A post created successfully.");
          } else {
            console.log(res.data.message)
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    setSelectedImg("");
    reset();
    setPostCategory('');
  };

  return (
    <div>
      <div
        className={`${
          createPostCard
            ? "fixed w-[580px] h-[588px] bg-[#fff] rounded-[8px] shadow-lg z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            : "hidden"
        }  `}
      >
        <div>
          {/* Header with cancle button */}
          <div className="flex justify-between items-center py-3 px-4">
            <h5 className="text-[14px] font-light">Create a new post</h5>
            {/* Card cancle button */}
            <button
              className="w-[36px] h-[36px] bg-[#f9f9f9] rounded-md flex justify-center items-center border border-[#f6f6f6] hover:border-[#eee] transition text-center"
              onClick={() => setCreatePostCard(!createPostCard)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="rotate-45 text-center pl-[2px] text-[#]"
              >
                <path
                  fill="currentColor"
                  d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z"
                />
              </svg>
            </button>
          </div>

          {/* Editor body */}
          <div className="px-4 flex flex-col">
            {/* Top */}
            <div className="flex justify-between items-center mt-[8px] mb-[8px]">
              <h3 className="text-[24px] ">Share your thougth by</h3>
              <div className="flex gap-[4px] items-center">
                {/*  Post category option */}
                <button
                  onClick={() => setPostCategory("Post")}
                  className="w-[52px] px-2 py-1 h-[28px] text-[12px] bg-[#e0f7ff] border border-[#e0f7ff] hover:border-[#c0e8ca] text-[#007bbf]  rounded-[24px] flex items-center text-center justify-center cursor-pointer"
                >
                  Post
                </button>
                <button
                  onClick={() => setPostCategory("News")}
                  className="w-[54px] px-2 py-1 h-[28px] text-[12px] bg-[#e6f8ed] text-[#1f7f34] border border-[#e6f8ed] hover:border-[#c0f0ff] rounded-[24px] flex items-center text-center justify-center cursor-pointer"
                >
                  News
                </button>
                <button
                  onClick={() => setPostCategory("Article")}
                  className="w-[56px] px-2 py-1 h-[28px] text-[12px] bg-[#f5f3ff] text-[#6b46c1] border border-[#f5f3ff] hover:border-[#e0d9ff] rounded-[24px] flex items-center text-center justify-center cursor-pointer"
                >
                  Article
                </button>
              </div>
            </div>

            {/* Selected category */}
            {/*  */}
            {postCategory && (
              <div
                onClick={() => setPostCategory("Post")}
                className="w-[52px] px-2 py-1 h-[28px] text-[12px] bg-[#00CFFF] border border-[#13BCE3] hover:border-[#c0e8ca] text-[white]  rounded-[24px] flex items-center text-center justify-center cursor-pointer mb-[8px]"
              >
                {postCategory}
              </div>
            )}

            {/*================= Create post form input fields============= */}
            <form onSubmit={handleSubmit(handlePostSubmit)}>
              {/* <label
              className="text-[#2c5364] mb-[8px] text-[16px] font-regular "
              htmlFor="title"
            >
              Post Title:
            </label> */}
              <input
                {...register("postTitle", { required: false })}
                type="text"
                id="postTitle"
                className="border border-[#f5f5f5] rounded-[4px] px-[16px] py-2 block w-full mt-[4px] mb-[12px] focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] placeholder:font-light outline-none"
                placeholder="post title"
              />
              <textarea
                {...register("postContent", { required: false })}
                id="postContent"
                rows={5}
                className="border border-[#f5f5f5] rounded-[4px] px-[16px] py-2 block w-full mt-[4px] mb-[16px] focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] placeholder:font-light outline-none resize-none"
                placeholder="write your post here..."
              />

              {/* Updaload option */}
              <div className="">
                <button
                  className="w-full h-[66px] bg-[#f6f6f6] rounded-md flex flex-col justify-center items-center border-2 border-dotted border-[#f6f6f6] hover:border-gray-200 transition text-center mr-4 gap-1"
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
                  <span className="text-[14px] font-light">
                    Click to Upload
                  </span>
                </button>

                <input
                  type="file"
                  {...register("image", { required: false })}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Preview image */}
              {selectedImg && (
                <div className="w-[66px] h-[70px] mt-[12px] rounded-md border border-[#f6f6f6] relative">
                  <button
                    className="w-[28px] absolute top-0 right-0 h-[28px] bg-[#f1f1f1] hover:bg-[#f6f6f6] rounded-md flex justify-center items-center border border-[#f6f6f6] hover:border-[#ddd] transition text-center"
                    onClick={() => {
                      setSelectedImg("");
                      setFileName("No file chosen");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="rotate-45 text-center pl-[2px] text-[#]"
                    >
                      <path
                        fill="currentColor"
                        d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z"
                      />
                    </svg>
                  </button>
                  <img src={selectedImg} className="w-full h-full rounded-md" />
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className={`bg-[#00CFFF] hover:bg-[#13BCE3] text-center text-white text-lg font-regular rounded-[4px] px-2 py-2 mt-6 mb-3 absolute bottom-1 left-4 right-4`}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
