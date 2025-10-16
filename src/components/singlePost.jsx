"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SERVER_URL } from "../utilitis/SERVER_URL";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import SinglePostSkeleton from "@/loadingComments/singlePostSkeleton";
import handleUserPostInteraction from "@/utilitis/handleUserPostInteraction";
import { useForm } from "react-hook-form";
import timeAgo from "@/utilitis/timeAgoFunction";
import { Flex, Spin } from "antd";

export default function SinglePost({
  postId,
  userId,
  setPosts,
  showSinglePost,
  setShowSinglePost,
  bottomSheet,
  setBottomSheet,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
  const [post, setPost] = useState({});
  const router = useRouter();
  const [reload, setReload] = useState(false);
  const [reloadPost, setReloadPost] = useState(false);
  const isSinglePost = true;
  const cardRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // GETTING/FETCHING SINGLE POST
  useEffect(() => {
    (async () => {
      await axios
        .get(`${SERVER_URL}/post/get-one/${postId}`, {
          headers: {
            authorization: "Bearer " + cookies.Token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status == "200") {
            setPost(res.data.data);
            setLoading(false);
            console.log("top user name", res.data.data);
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [reloadPost]);

  // ANIMATE USER TO COMEMNT BOX
  useLayoutEffect(() => {
    if (bottomSheet === true) {
      setTimeout(() => {
        if (cardRef?.current) {
          cardRef?.current?.scrollIntoView({
            behavior: "smooth",
          });
        }
        // console.log(bottomSheet)
      }, 600);
    }
  }, [reload, bottomSheet]);

  // COMMENT SUBMIT FUNCTION
  const commentSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    await axios
      .patch(
        `${SERVER_URL}/post/createComment`,
        { postId, userId, comment: data.comment },
        {
          headers: {
            authorization: "Bearer " + cookies.Token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "200") {
          setReloadPost(!reloadPost);
        } else {
          console.log(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });

    reset();
  };

  console.log(post);

  const liked = post?.likes?.includes(userId);
  const likeCount = post?.likes?.length || 0;
  const sortedComments = post?.comments?.sort((a, b) => {
    b.createOn - a.createOn;
  });

  return (
    <div className={` fixed w-[95%] md:w-[80%] mx-auto text-white relative`}>
      {/* Home return button */}
      <button onClick={() => setShowSinglePost(!showSinglePost)}>
        <div className="bg-[#203A43] w-[100px] h-[44px] flex justify-center items-center rounded-[8px] mb-2 md:mb-3 mt-[20px] md:mt-[30px]">
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
      {Object.keys(post).length > 0 ? (
        <div className="md:flex gap-[40px] relative">
          {/* Single Post Content */}
          {/* {(() => {
            const liked = post?.likes?.includes(userId);
            const likeCount = post?.likes?.length || 0;

            return ( */}
          <div className="md:w-[60%] mt-[12px] bg-[#203a43] border border-[#2c5364] px-[20px] pt-[24px] pb-[16px] mb-[20px] rounded-[16px]">
            {/* Post content */}
            <div>
              {/* POST HEADING */}
              {post?.postTitle && (
                <h1 className="text-[20px] md:text-[24px] mb-[16px] font-regular capitalize">
                  {post?.postTitle}
                </h1>
              )}

              {/* User info */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4 mt-[12px] items-center">
                  {/*  User image */}
                  <div className="md:w-[38px] w-[32px] h-[32px] md:h-[38px] bg-[#f1f1f1] rounded-full">
                    {post.userImg && (
                      <img
                        src={post.userImg}
                        className="w-full h-full rounded-full"
                        alt=""
                      />
                    )}
                  </div>

                  <div>
                    <h3 className="text-[18px] font-regular cursor-pointer capitalize">
                      {post.userName}
                    </h3>
                    <h5 className="text-[13px] font-light text-gray-200/90">
                      {timeAgo(post?.createOn)}
                    </h5>
                  </div>
                </div>

                <div className="w-[92px] h-[36px] bg-[#00CFFF] rounded-full text-white text-center flex gap-1 md:gap-2 items-center justify-center cursor-pointer hover:opacity-90 transition">
                  <span className="text-center">Follow</span>
                </div>
              </div>

              {/* Post Image */}
              {post?.postImgUrl && (
                <div className="w-full h-[200px] md:h-[280px] h-full rounded-[12px] md:rounded-[16px] flex items-center justify-center bg-[#203A43] mt-[16px] md:mt-[32px]">
                  <img
                    className="w-full h-[200px] md:h-[280px] rounded-[12px] md:rounded-[16px]"
                    src={post?.postImgUrl}
                    alt=""
                  />
                </div>
              )}

              {/* Post Description */}
              {post?.postContent && (
                <p className="md:mt-[28px] mt-[20px] text-[16px] md:text-[18px] font-regular text-[#ddd]">
                  {post?.postContent}
                </p>
              )}
            </div>
            {/* Interaction Buttons */}
            <div className="my-[20px] md:my-[24px]">
              <div className="flex gap-4 items-center mt-[12px] md:mt-[24px]">
                {/* Love */}
                <div
                  onClick={() => {
                    handleUserPostInteraction(
                      setPosts,
                      postId,
                      userId,
                      setPost,
                      cookies.Token,
                      isSinglePost
                    );
                  }}
                  className="px-3 h-[44px] border border-[#203A43] hover:border-[#2c5364] bg-[#203A43] hover:bg-[#0f2027] rounded-[14px] flex gap-[6px] items-center justify-center cursor-pointer"
                >
                  {liked ? (
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
                    </svg>
                  ) : (
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
                  )}
                  {likeCount > 0 && (
                    <span
                      style={{
                        display: "inline-block",
                        animation: "popIn 0.3s ease-out",
                      }}
                      className="text-[16px] font-extralight pt-[2px] transition-all ease-out duration-300 transform"
                    >
                      {likeCount}
                    </span>
                  )}
                </div>

                {/* comment */}
                <div
                  onClick={() => {
                    setBottomSheet(true);
                    setReload(!reload);
                  }}
                  className="pl-3 pr-3 h-[44px] border border-[#203A43] bg-[#203A43] hover:border-[#2c5364] hover:bg-[#0f2027] rounded-[14px] flex gap-[8px] items-center justify-center cursor-pointer"
                >
                  {/* <a href="#comment" /> */}
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
                  {post?.comments.length > 0 && (
                    <span
                      style={{
                        display: "inline-block",
                        animation: "popIn 0.3s ease-out",
                      }}
                      className="text-[16px] font-extralight pt-[2px] transition-all ease-out duration-300 transform"
                    >
                      {post?.comments.length}
                    </span>
                  )}
                </div>

                {/* share */}
                <div className="w-[56px] h-[44px] border border-[#203A43] bg-[#203A43] hover:border-[#2c5364] hover:bg-[#0f2027] rounded-[14px] flex pb-1 items-center justify-center cursor-pointer">
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
            {/* COMMENTS SHOWING AREA */}
            <h4 className="text-[16px] mb-2">Comments</h4>
            <div className="comment-box mb-[28px] mt-[16px]  max-h-[400px] overflow-y-auto">
              {post?.comments.length > 0 ? (
                sortedComments?.map((c) => {
                  return (
                    <div key={c.id} className="mt-[12px] mb-[28px] pr-2">
                      {/* User info */}
                      <div className="">
                        <div className="flex justify-between items-start gap-4 mt-[12px]">
                          {/*  User image */}
                          <div className="md:w-[32px] w-[30px] h-[30px] md:h-[32px] bg-[#f1f1f1] rounded-full">
                            {c.userImg && (
                              <img
                                src={c.userImg}
                                className="w-full h-full rounded-full"
                                alt=""
                              />
                            )}
                          </div>
                          <div className="w-[90%] mx-auto items-start">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-[16px] font-regular cursor-pointer capitalize">
                                  {c.userName ? c.userName : "User"}
                                </h3>
                                <h5 className="text-[13px] font-light text-gray-300/80">
                                  {timeAgo(c?.createOn)}
                                </h5>
                              </div>

                              {/* DELETE BUTTON */}
                              <button
                                disable={userId != c?.userId}
                                className={`${
                                  userId != c?.userId &&
                                  "cursor-not-allowed bg-transparent hover:bg-transparent text-gray-500 hover:text-gray-500"
                                } hover:bg-[#f1f1f1] h-[36px] text-[#eee] px-2 py-1 rounded hover:text-[#8b0000]`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 32 32"
                                  className=""
                                >
                                  <path
                                    fill="currentColor"
                                    d="M14 12.5a.5.5 0 0 0-1 0v11a.5.5 0 0 0 1 0zm4.5-.5a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m2-5.5V7h8a.5.5 0 0 1 0 1h-2.543l-1.628 17.907A4.5 4.5 0 0 1 19.847 30h-7.694a4.5 4.5 0 0 1-4.482-4.093L6.043 8H3.5a.5.5 0 0 1 0-1h8v-.5a4.5 4.5 0 1 1 9 0m-8 0V7h7v-.5a3.5 3.5 0 1 0-7 0M7.048 8l1.62 17.817A3.5 3.5 0 0 0 12.152 29h7.694a3.5 3.5 0 0 0 3.486-3.183L24.953 8z"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Comments */}
                            <div className="mt-2 w-">
                              <p className="text-[14px] font-light text-[#ddd]">
                                {c.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col mt-[20px] justify-center items-center text-[16px] font-light text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      stroke="whtie"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3.464 16.828C2 15.657 2 14.771 2 11s0-5.657 1.464-6.828C4.93 3 7.286 3 12 3s7.071 0 8.535 1.172S22 7.229 22 11s0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96"
                    />
                  </svg>
                  No comments yet
                </div>
              )}
            </div>

            {loading && (
              <div className="flex items-center justify-center my-[16px]">
                <Spin />
              </div>
            )}

            {/* Comment box/form */}
            <div ref={cardRef} id="comment" className="w-[100%] relative">
              <form onSubmit={handleSubmit(commentSubmit)} className="">
                <textarea
                  id="postContent"
                  rows={2}
                  {...register("comment", { required: true })}
                  className={`${
                    loading && "cursor-not-allowed bg-[#eee]"
                  } rounded-[8px] bg-[#ddd pl-[16px] py-3 block w-full mt-[4px] mb-[10px] md:mb-[16px] focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] border border-[#00CFFF] shadow-lg text-black placeholder:font-light outline-none resize-none pr-[54px]`}
                  placeholder="write your comment..."
                  disabled={loading}
                />
                <button
                  type="submit"
                  className={`${
                    loading && "cursor-not-allowed bg-[#ddd] hover:bg-[#f1f1f1]"
                  } bg-[#e0f7ff] px-[4px] py-[3px] md:px-[8px] md:py-[7px] rounded-md text-center text-white text-lg font-regular md:mt-6 mt-3 mb-2 md:mb-1 hover:bg-[#b3eeff] absolute bottom-[3px] md:bottom-[4px] right-2 md:right-2 transition`}
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 24 24"
                    className={`${loading ? "text-[#]" : "text-[#00CFFF]"} `}
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
          {/* );
          })()} */}

          {/* Left similar post suggestion */}
          <div className="w-[30%] hidden md:block mt-[16px] px-[16px] ml-auto py-[20px] rounded-[16px] fixed right-[10%] bg-[#203a43] border border-[#2c5364] overflow-y-auto h-[80vh]">
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
      ) : (
        <SinglePostSkeleton />
      )}
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
