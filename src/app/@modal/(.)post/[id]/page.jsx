'use client'

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { SERVER_URL } from "./../../utilitis/SERVER_URL";
import { SERVER_URL } from "../../../../utilitis/SERVER_URL";
import { useCookies } from "react-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";


export default function SinglePostModal({
    params,
}) {

  console.log("post id from modal", params);

  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
  const [post, setPost] = useState({})


  // useEffect(() => {
  //   (async () => {
  //     await axios
  //       .get(`${SERVER_URL}/post/get-one/${params.id}`,
  //         {
  //           headers: {
  //             authorization: "Bearer " + cookies.Token,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data.status == "200") {
  //           setPost(res.data.data)
  //           // console.log("top user name", userName, userImg);
  //         } else {
  //           console.log(res.data);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })();
  // }, [])
  

  return (
      <div className="w-[100%] bg-gradient-to-b from-[#2c5364] via-[#203a43] to-[#0f2027] fixed top-0 z-[100] min-h-screen overflow-y-auto">
        {/* Home return button */}
        <button onClick={()=>router.back()}>
          {/* <div className="w-[100%] bg-gradient-to-b from-[#2c5364] via-[#203a43] to-[#0f2027] fixed top-0 z-[100] min-h-screen overflow-y-auto"> */}
          <div className=" bg-[#203A43] w-[100px] h-[44px] flex justify-center items-center rounded-[8px] mb-4 mt-[30px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            <span className="text-[#ddd] text-[16px]">Home</span>
          </div>
        </button>
        {/* Body */}
        <div className="flex gap-[80px] relative">
          {/* Single Post Content */}
          <div className="w-[55%] mt-[12px] bg-[#203a43] border border-[#2c5364] px-[20px] py-[24px] mb-[20px] rounded-[16px]">
            {/* Post content */}
            <div>
              {/* POST HEADING */}
              {/* {post?.postTitle && (
                <h1 className="text-[24px] my-[16px] font-semibold">
                  {post?.postTitle}
                </h1>
              )} */}

              {/* User info */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4 mt-[12px] items-center">
                  {/*  User image */}
                  <div className="md:w-[38px] w-[32px] h-[32px] md:h-[38px] bg-[#f1f1f1] rounded-full">
                    {/* <img
                        src={``}
                        className="w-full h-full rounded-full"
                        alt=""
                      /> */}
                  </div>

                  <div>
                    <h3 className="text-[18px] font-regular cursor-pointer">
                      Admin
                    </h3>
                    <h5 className="text-[13px] font-light text-[#ddd]">
                      2 hours ago
                    </h5>
                  </div>
                </div>
                <div className="w-[100px] h-[36px] bg-[#00CFFF] rounded-full text-white text-center flex gap-1 md:gap-2 items-center justify-center cursor-pointer hover:opacity-90 transition pl-1">
                  <span className="pl-1 text-center">Follow</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z"
                    />
                  </svg>
                </div>
              </div>

              {/* Post Image */}
              {/* {post?.postImgUrl && (
                <div className="w-full h-[200px] md:h-[280px] h-full rounded-[12px] md:rounded-[20px] flex items-center justify-center bg-[#203A43] mt-[12px] md:mt-[24px]">
                  <img
                    className="w-full h-[200px] md:h-[280px] rounded-[12px] md:rounded-[20px]"
                    src={post?.postImgUrl}
                    alt=""
                  />
                </div>
              )} */}

              {/* Post Description */}
              {/* {post?.postContent && (
                <p className="md:mt-[28px] mt-[20px] text-[18px] font-regular text-[#ddd]">
                  {post?.postContent}
                </p>
              )} */}
            </div>

            {/* Interaction Buttons */}
            <div className="my-[40px]">
              <div className="flex gap-4 items-center mt-[12px] md:mt-[24px]">
                {/* Love */}
                <div className="px-3 h-[44px] border border-[#203A43] hover:border-[#2c5364] bg-[#203A43] hover:bg-[#0f2027] rounded-[16px] flex gap-[6px] items-center justify-center cursor-pointer">
                  {/* (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ef4444"
                      d="M11.566 21.112L12 20.5za.75.75 0 0 0 .867 0L12 20.5l.434.612l.008-.006l.021-.015l.08-.058q.104-.075.295-.219a38.5 38.5 0 0 0 4.197-3.674c1.148-1.168 2.315-2.533 3.199-3.981c.88-1.44 1.516-3.024 1.516-4.612c0-1.885-.585-3.358-1.62-4.358c-1.03-.994-2.42-1.439-3.88-1.439c-1.725 0-3.248.833-4.25 2.117C10.998 3.583 9.474 2.75 7.75 2.75c-3.08 0-5.5 2.639-5.5 5.797c0 1.588.637 3.171 1.516 4.612c.884 1.448 2.051 2.813 3.199 3.982a38.5 38.5 0 0 0 4.492 3.892l.08.058l.021.015z"
                    />
                  </svg> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M16.696 3C14.652 3 12.887 4.197 12 5.943C11.113 4.197 9.348 3 7.304 3C4.374 3 2 5.457 2 8.481s1.817 5.796 4.165 8.073S12 21 12 21s3.374-2.133 5.835-4.446C20.46 14.088 22 11.514 22 8.481S19.626 3 16.696 3"
                    />
                  </svg>
                  {/* { (
                  <span
                    style={{
                      display: "inline-block",
                      animation: "popIn 0.3s ease-out",
                    }}
                    className="text-[16px] font-extralight pt-[2px] transition-all ease-out duration-300 transform"
                  >
                  </span>
                )} */}
                </div>

                {/* comment */}
                <div className="w-[56px] h-[44px] border border-[#203A43] bg-[#203A43] hover:border-[#2c5364] hover:bg-[#0f2027] rounded-[16px] flex items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3.464 16.828C2 15.657 2 14.771 2 11s0-5.657 1.464-6.828C4.93 3 7.286 3 12 3s7.071 0 8.535 1.172S22 7.229 22 11s0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96"
                    />
                  </svg>
                </div>

                {/* share */}
                <div className="w-[56px] h-[44px] border border-[#203A43] bg-[#203A43] hover:border-[#2c5364] hover:bg-[#0f2027] rounded-[16px] flex pb-1 items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19.59 12L15 7.41v2.46l-.86.13c-4.31.61-7.23 2.87-8.9 6.33c2.32-1.64 5.2-2.43 8.76-2.43h1v2.69m-2-1.69v.02c-4.47.21-7.67 1.82-10 5.08c1-5 4-10 11-11V5l7 7l-7 7v-4.1c-.33 0-.66.01-1 .02Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Comment box/form */}

            <div id="comment" className="w-[100%] shadow relative">
              <form action="">
                <textarea
                  id="postContent"
                  rows={1}
                  className="rounded-[8px] px-[16px] py-3 block w-full mt-[4px] mb-[10px] md:mb-[16px] focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] border border-[#00CFFF] shadow-lg text-black placeholder:font-light outline-none resize-none"
                  placeholder="write your comment..."
                />

                {/* <button
                type="submit"
                className="bg-[#00CFFF] text-center text-white text-lg font-regular rounded-[8px] px-4 py-2 md:mt-6 mt-3 mb-2 md:mb-3 absolute bottom-[3px] md:bottom-[0px] right-2 md:right-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M20.235 5.686c.432-1.195-.726-2.353-1.921-1.92L3.709 9.048c-1.199.434-1.344 2.07-.241 2.709l4.662 2.699l4.163-4.163a1 1 0 0 1 1.414 1.414L9.544 15.87l2.7 4.662c.638 1.103 2.274.957 2.708-.241z"
                    />
                  </g>
                </svg>
              </button> */}
                <button
                  type="submit"
                  className="bg-[#f6f6f6] px-3 py-1 rounded-[8px] text-center text-white text-lg font-regular md:mt-6 mt-3 mb-2 md:mb-1 hover:bg-[#eee] absolute bottom-[3px] md:bottom-[0px] right-2 md:right-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className="text-[#00CFFF]"
                  >
                    <g fill="none">
                      <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="currentColor"
                        d="M20.235 5.686c.432-1.195-.726-2.353-1.921-1.92L3.709 9.048c-1.199.434-1.344 2.07-.241 2.709l4.662 2.699l4.163-4.163a1 1 0 0 1 1.414 1.414L9.544 15.87l2.7 4.662c.638 1.103 2.274.957 2.708-.241z"
                      />
                    </g>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Left similar post suggestion */}
          <div className="w-[32%] mt-[16px] px-[16px] ml-auto py-[20px] rounded-[16px] fixed right-[10%] bg-[#203a43] border border-[#2c5364] overflow-y-auto h-[80vh]">
            <h2 className="text-[18px] font-semibold">You may also like it</h2>
            <ul className="list-inside mt-[16px]">
              <li>
                <Link
                  href="/post/1"
                  className="flex gap-4 text-[#ddd] hover:text-blue-500 hover:underline mt-[20px] text-[15px]"
                >
                  {/* <div className="w-[80px] h-[40px] md:rounded-[4px] bg-[#203A43]">
                      
                    </div> */}
                  <div className="line-clamp-3 flex gap-2">
                    <div className="w-[180px] h-[40px] md:rounded-[4px] bg-[#203A43]">
                      <img
                        className="w-[60px] h-[60px] rounded-[12px]"
                        src={``}
                        alt=""
                      />
                    </div>

                    <span className="line-clamp-3">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolor fugit laudantium ea officiis! Repellat, ut. etur
                      adipisicing elit. Dolor fugit laudantium ea officiis!
                      Repellat, ut.etur adipisicing elit. Dolor fugit laudantium
                      ea officiis! Repellat, ut.
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/post/1"
                  className="flex gap-4 text-[#ddd] hover:text-blue-500 hover:underline mt-[20px] text-[15px]"
                >
                  {/* <div className="w-[80px] h-[40px] md:rounded-[4px] bg-[#203A43]">
                      
                    </div> */}
                  <div className="line-clamp-3 flex gap-2">
                    <div className="w-[180px] h-[40px] md:rounded-[4px] bg-[#203A43]">
                      <img
                        className="w-[60px] h-[60px] rounded-[12px]"
                        src={``}
                        alt=""
                      />
                    </div>

                    <span className="line-clamp-3">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolor fugit laudantium ea officiis! Repellat, ut. etur
                      adipisicing elit. Dolor fugit laudantium ea officiis!
                      Repellat, ut.etur adipisicing elit. Dolor fugit laudantium
                      ea officiis! Repellat, ut.
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/post/1"
                  className="flex gap-4 text-[#ddd] hover:text-blue-500 hover:underline mt-[20px] text-[15px]"
                >
                  {/* <div className="w-[80px] h-[40px] md:rounded-[4px] bg-[#203A43]">
                      
                    </div> */}
                  <div className="line-clamp-3 flex gap-2">
                    <div className="w-[180px] h-[40px] md:rounded-[4px] bg-[#203A43]">
                      <img
                        className="w-[60px] h-[60px] rounded-[12px]"
                        src={``}
                        alt=""
                      />
                    </div>

                    <span className="line-clamp-3">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolor fugit laudantium ea officiis! Repellat, ut. etur
                      adipisicing elit. Dolor fugit laudantium ea officiis!
                      Repellat, ut.etur adipisicing elit. Dolor fugit laudantium
                      ea officiis! Repellat, ut.
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/post/1"
                  className="flex gap-4 text-[#ddd] hover:text-blue-500 hover:underline mt-[20px] text-[15px]"
                >
                  {/* <div className="w-[80px] h-[40px] md:rounded-[4px] bg-[#203A43]">
                      
                    </div> */}
                  <div className="line-clamp-3 flex gap-2">
                    <div className="w-[180px] h-[40px] md:rounded-[4px] bg-[#203A43]">
                      <img
                        className="w-[60px] h-[60px] rounded-[12px]"
                        src={``}
                        alt=""
                      />
                    </div>

                    <span className="line-clamp-3">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolor fugit laudantium ea officiis! Repellat, ut. etur
                      adipisicing elit. Dolor fugit laudantium ea officiis!
                      Repellat, ut.etur adipisicing elit. Dolor fugit laudantium
                      ea officiis! Repellat, ut.
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <form onSubmit={handleSubmit(handlePostSubmit)}>
            {/* <label
                  className="text-[#2c5364] mb-[8px] text-[16px] font-regular "
                  htmlFor="title"
                >
                  Post Title:
                </label> *
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
              className="border border-[#f5f5f5] rounded-[4px] px-[16px] py-2 block w-full mt-[4px] mb-[10px] md:mb-[16px] focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] placeholder:font-light outline-none resize-none"
              placeholder="write your post here..."
            />
    
            {/* Updaload option *
            <div className="">
              <button
                className="w-full h-[60px] md:h-[66px] bg-[#f6f6f6] rounded-md flex flex-col justify-center items-center border-2 border-dotted border-[#f6f6f6] hover:border-gray-200 transition text-center mr-4 gap-1"
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
                <span className="text-[14px] font-light">Click to Upload</span>
              </button>
    
              <input
                type="file"
                {...register("image", { required: false })}
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
    
            {/* Preview image *
            {selectedImg && (
              <div className="md:w-[66px] w-[52px] h-[60px] md:h-[70px] mt-[8px] md:mt-[12px] rounded-md border border-[#f6f6f6] relative">
                <button
                  className="md:w-[28px] w-[24px] h-[24px] absolute top-0 right-0 md:h-[28px] bg-[#f1f1f1] hover:bg-[#f6f6f6] rounded-md flex justify-center items-center border border-[#f6f6f6] hover:border-[#ddd] transition text-center"
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
    
            {/* Submit button *
            <button
              type="submit"
              className={`${
                loading
                  ? "bg-[#f9f9f9] cursor-not-allowed"
                  : "bg-[#00CFFF] hover:bg-[#13BCE3]"
              } text-center text-white text-lg font-regular rounded-[4px] px-2 py-2 md:mt-6 mt-3 mb-2 md:mb-3 absolute bottom-[3px] md:bottom-[6px] left-2 right-2 md:left-4 md:right-4`}
              disabled={loading}
            >
              {loading ? <Spin /> : "Create Post"}
            </button>
          </form> */}
      </div>
  );
}
