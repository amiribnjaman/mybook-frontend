"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import CreatePostCard from "@/components/createPostCard";
import Image from "next/image";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import { useForm } from "react-hook-form";
import axios from "axios";
import FeedSkeleton from "@/loadingComments/feedSkeleton";
import { useCookies } from "react-cookie";
import TopNav from "./topNav";
// import SinglePost from "@/app/@modal/(.)post/[id]/page";
import LeftSidebar from "./leftSidebar";
import { useRouter } from "next/navigation";
import SinglePost from "./singlePost";

export default function Feed() {
  const [createPostCard, setCreatePostCard] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [postId, setPostId] = useState("");
  const [postIdForMoreAction, setPostIdForMoreAction] = useState("");
  const [reload, setReload] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [showEditComField, setShowEditComField] = useState(false);
  const [showReplyField, setShowReplyField] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [commentPostId, setCommentPostId] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [showIntercectionCard, setShowIntercectionCard] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
  const [postLiked, setPostLiked] = useState(false);
  const navigate = useRouter();
  const [showSinglePost, setShowSinglePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  let userId;
  /*
   **
   ** GETTING LOGEDIN USER-ID FROM LOCALSTORAGE
   **
   */
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage?.getItem("user"));
    userId = user?.id;
  }

  /*
   **
   ** FETCHING ALL POST
   **
   */
  useEffect(() => {
    fetch(`${SERVER_URL}/post/allpost`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          console.log(posts);
          setPosts(data.data);
        }
      });
  }, []);

  /*
   **
   ** TOGGLE SCROLL BEHAVIOR
   **
   */
  useEffect(() => {
    if (showSinglePost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSinglePost]);

  // console.log(posts);

  /*
   **
   ** DELETE A SINGLE POST
   **
   */
  const handleDeletePost = async () => {
    // If userid and post id is available then hit the api
    if (userId && postIdForMoreAction) {
      await axios
        .delete(
          `${SERVER_URL}/post/deletePost/${userId}/${postIdForMoreAction}`,
          {
            headers: {
              authorization: "Bearer " + cookies.Token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setReload(!reload);
        });
    }
  };

  /*
   **
   ** CREATE A NEW COMMENT
   **
   */
  const createComment = async (d) => {
    const data = {
      comment: d.comment,
      postId: postId,
      userId: userId,
    };

    /*
     **
     ** IF COMMENT FIELD HAS VALUE THEN HIT THE API
     **
     */
    if (d.comment) {
      await axios
        .patch(`${SERVER_URL}/post/createComment`, data, {
          headers: {
            authorization: "Bearer " + cookies.Token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.status);
          setReload(!reload);

          // PUSH NOTIFICATION FOR COMMENT
          (async () => {
            if (res.data.status == "200") {
              // PUSH A NEW NOTIFICATION
              await axios
                .patch(
                  `${SERVER_URL}/user/notification`,
                  {
                    userId,
                    postId,
                    type: "comment",
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  // console.log(res);
                });
            }
          })();
        });
    }
    reset();
  };

  /*
   **
   ** DELETE A SINGLE COMENT
   **
   */
  const handleCommentDelete = async (postid, commentId) => {
    if (userId) {
      await axios
        .delete(
          `${SERVER_URL}/post/deleteComment/${userId}/${commentId}/${postid}`,
          {
            headers: {
              authorization: "Bearer " + cookies.Token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setReload(!reload);
        });
    }
  };

  /*
   **
   ** A COMMON FUNCTION FOR ALL GENERAL EVENT HANDLER
   ** OR TOGGLE SHOW HIDE ALL INTERACTION CARD/BUTTONS
   ** FOLLOWING DRY PRINCIPLE
   ** THIS FUNCTION EXPECT 6 PARAMETER
   ** 1. ID- THIS MAYBE A POSTID OR COMMENT ID.
   ** 2. IDSETTER- THIS IS A SETTER FUNCTION OR REACT STATE SETTER FUNCITON. THIS SETTER FUNCTION SET THE ID WHICH THE 1. PARAMETER ID RECIEVED.
   ** 3. THIS IS ANOTHER ID- (OPTIONAL), FOR THOSE EVENT WHICH NEED TWO ID. FOR EXAMPLE, COMMENT OPERATION WE NEED 2 ID'S ONE ID FOR SPECIFIC POST AND ANOTHER ONE FOR COMMENT.
   ** 4. ANOTHER ID SETTER- (OPTIONAL), IF 3. OR ANOTHER ID IS PRESENT THEN SET THE ID INTO THIS STATE SETTER FUNCTION
   ** 5. STATE- THIS IS FOR GETTING THE CURRENT STATE OF THE CLICKED OR SELECTED CARD/BUTTON ETC.
   ** 6. STATE SETTER FUNCTION- THIS TOGGLE (SET TRUE/FALSE) THE STATE WHICH ONE HAD CLICKED CARD/BUTTON
   **
   **
   */

  const handlerCommonFunction = (
    id,
    idSetter,
    anotherId = "",
    anotherIdSetter,
    state,
    stateSetter
  ) => {
    anotherIdSetter != "" && anotherIdSetter(anotherId);
    idSetter(id);
    stateSetter(!state);
  };

  /*
   **
   ** LOGEDIN USER INTERECTION FUNCTION INTO POST
   ** IF USERID AND LIKE.USERID EQUELD IMPROVE THE UX
   ** THIS FUCTION EXPECT 3 PARAMETER
   ** 1. TYPE- THIS TYPE INDICATE MAY COUNT OR LIKE. IF 'LIKE' THEN RETURN THE USER INTERECTION TYPE OR IF COUNT THEN RETURN THE ALL/TOTAL USER INTERECTION INTO A POST
   ** 2. POST- THIS POST MEANS CURRENT POST
   ** 3. LENGTH- THIS INDICATE THE POST TOTAL USER INTERECTION OR LIKES
   **
   **
   */
  const handleUserPostInteraction = async (postId) => {
    // Immediate UI update for better UX
    setPosts((prevPost) =>
      prevPost.map((post) => {
        if (post?.id === postId) {
          // console.log('inside', userId, post?.likes.map(p => p === userId));

          const isLiked = post?.likes?.includes(userId);

          return {
            ...post,
            likes: isLiked
              ? post?.likes?.filter((like) => like !== userId)
              : [...post?.likes, userId],
          };
        }
        return post;
      })
    );

    // Server operation - User interaction submit on Server
    await axios
      .patch(
        `${SERVER_URL}/post/interaction`,
        { postId, userId },
        {
          headers: {
            authorization: "Bearer " + cookies.Token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.status == 201) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        // Immediate UI Revert if fail
        setPosts((prevPost) =>
          prevPost.map((post) => {
            if (post?.id === postId) {
              // console.log('inside', userId, post?.likes.map(p => p === userId));

              const isLiked = post?.likes?.includes(userId);

              return {
                ...post,
                likes: isLiked
                  ? post?.likes?.filter((like) => like !== userId)
                  : [...post?.likes, userId],
              };
            }
            return post;
          })
        );
      });
  };

  const handlePostLike = (postId) => {
    console.log(postId);
  };

  /*
   **
   ** HANDLE COMMENT LIKE
   **
   */
  const handleCommentLikeSubmit = async (postId, commentId) => {
    const data = {
      likeType: "Like",
      postId: postId,
      userId: userId,
      commentId: commentId,
    };

    if (commentId) {
      await axios
        .patch(`${SERVER_URL}/post/comment-likes`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setReload(!reload);
        });
    }
  };

  return (
    <div className="relative">
      <div>
        <div>
          <div className="fixed top-0 left-0 w-full h-[84px] md:h-[140px] z-50 shadow bg-[#2c5364]">
            <TopNav
              createPostCard={createPostCard}
              setCreatePostCard={setCreatePostCard}
            />
          </div>
          {/* <hr className="w-[95%] mx-auto mt-[16px] mb-[20px] h-[.5px] text-[#203A43] bg-[#203A43]" /> */}
          {/* <div className="pt-[120px] mb-8 mt-8 flex justify-center">
        <hr className="w-[95%] min-h-[.5px] text-[#203A43] bg-[#203A43]" />
      </div> */}
          {/* feed */}

          {posts?.length > 0 ? (
            <div
              className={`${
                createPostCard &&
                "blur-sm opacity-50 pointer-events-none overflow-hidden"
              } mt-[72px] md:mt-[140px] mx-auto mb-8 w-full gap-8 min-h-screen flex`}
            >
              {/* Feed left navbar */}
              <LeftSidebar />
              {/* 
        <div className="mb-8 mt-8 flex justify-center col-span-1">
          <hr className="w-[.2px] min-h-[80vh] text-[#f4f4f9] bg-[#f4f4f9]" />
        </div> */}

              {/* Main feed */}
              <div
                className={`${
                  showSinglePost ? "overflow-hidden" : "overflow-auto"
                } mb-4 mt-8 md:col-span-8 text-white w-[95%] md:w-[65%] flex-end md:ml-auto mx-auto md:mx-0 md:mr-[3%]`}
              >
                {/*============= Single post getting & showing throguh mapping=========== */}
                {posts?.map((post) => {
                  const liked = post?.likes?.includes(userId);
                  const likeCount = post?.likes?.length || 0;
                  return (
                    <div
                      key={post?.id}
                      className={` shadow bg-[#203a43] border border-[#2c5364] rounded-[18px] pt-[14px] md:pt-[20px] pb-[10px] md:pb-[14px] px-[8px] md:px-[20px] mb-[16px] md:mb-[28px]`}
                    >
                      {/* Post top userinfo sec  */}
                      <div className="flex justify-between items-center">
                        {/* User info */}
                        <div className="flex gap-4 items-center">
                          {/*  User image */}
                          <div className="md:w-[38px] w-[32px] h-[32px] md:h-[38px] bg-[#f1f1f1] rounded-full">
                            {post?.userImg && (
                              <img
                                src={post?.userImg}
                                className="w-full h-full rounded-full"
                                alt=""
                              />
                            )}
                          </div>

                          <div>
                            <h3 className="text-[18px] font-regular cursor-pointer capitalize">
                              {post?.userName}
                            </h3>
                            <h5 className="text-[13px] font-light text-[#ddd]">
                              2 hours ago
                            </h5>
                          </div>
                        </div>

                        {/* Top right- follow & more btn */}
                        <div className="flex ga-3 md:gap-6 items-center justify-center ml-2">
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

                          {/* More icon */}
                          <div className="cursor-pointer hover:bg-[#0f2027] h-[36px] w-[36px] rounded-lg flex items-center justify-center hover:opacity-90 transition">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="28"
                              viewBox="0 0 256 256"
                            >
                              <path
                                fill="currentColor"
                                d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12m56-12a12 12 0 1 0 12 12a12 12 0 0 0-12-12m-136 0a12 12 0 1 0 12 12a12 12 0 0 0-12-12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Post main section */}
                      <div className="mt-[24px] mb-[16px] md:grid md:grid-cols-6 gap-10">
                        {post?.postContent && (
                          <div className="col-span-4">
                            <h2
                              onClick={() => {
                                setShowSinglePost(!showSinglePost),
                                  setPostId(post.id);
                              }}
                              className="text-[21px] font-regular line-clamp-1 cursor-pointer hover:text-[#00CFFF] transition capitalize"
                            >
                              {/* onClick={() => {
                              setShowSinglePost(!showSinglePost),
                                   setSelectedPost(post)
                                }} */}
                              {post?.postTitle}
                              {/* Single post component */}

                              {/* {post?.postTitle.split(/\s+/).slice(0,8).join(' ')}
                      {post?.postTitle.split(/\s+/).length >8 && '...'} */}
                            </h2>

                            {/* Post category tag */}
                            {/* <div
                      className={`${
                        post?.postCategory == "Post" &&
                        "bg-[#00CFFF] text-[white]"
                      } ${
                        post?.postCategory == "Article" &&
                        "bg-[#8E56F7] text-white "
                      } ${
                        post?.postCategory == "News" &&
                        "bg-[#FF7A7A] text-white"
                      }  w-[52px] px-2 py-1 h-[28px] text-[12px] bg-[#00CFFF] text-[white] rounded-[24px] flex mt-[4px] items-center text-center justify-center mb-[8px]`}
                    >
                      {post?.postCategory ? post?.postCategory : "Post"}
                    </div> */}

                            <p className="md:mt-[24px] mt-[12px] text-[16px] font-light text-[#ddd] line-clamp-4">
                              {post?.postContent}
                              {/* {post?.postContent.split(/\s+/).slice(0,20).join(' ')}*/}
                              {/* {post?.postContent.split(/\s+/).length > 20 && "continue..."} */}
                            </p>
                          </div>
                        )}

                        {/* Post img */}
                        {post?.postImgUrl && (
                          <div className="col-span-2 mt-[20px] md:mt-0">
                            <div className="w-full h-[200px] md:h-[160px] h-full rounded-[12px] md:rounded-[20px] flex items-center justify-center">
                              <img
                                className="w-full h-[200px] md:h-[160px] rounded-[12px] md:rounded-[20px]"
                                src={post?.postImgUrl}
                                alt=""
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* User interaction on post */}
                      <div className="mt-[0px]">
                        <div className="flex gap-4 items-center">
                          {/* Love */}
                          <div
                            onClick={() => {
                              handleUserPostInteraction(post?.id);
                            }}
                            className="px-3 h-[44px] border border-[#203A43] hover:border-[#2c5364] bg-[#203A43] hover:bg-[#0f2027] rounded-[16px] flex gap-[6px] items-center justify-center cursor-pointer"
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
                              setShowSinglePost(!showSinglePost),
                                setPostId(post.id);
                            }}
                            className="w-[56px] h-[44px] border border-[#203A43] bg-[#203A43] hover:border-[#2c5364] hover:bg-[#0f2027] rounded-[16px] flex items-center justify-center cursor-pointer"
                          >
                            <a href="#comment" />
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

                      {/* <div className="mb-[12px] mt-6 flex justify-center">
                  <hr className="w-[100%] min-h-[.5px] text-[#fff] bg-[#fff]" />
                </div> */}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="md:mt-[160px] mt-[80px]">
              <FeedSkeleton />
            </div>
          )}
          {/* <FeedSkeleton /> */}
        </div>

        {/* CREATE POST CARD */}
        {createPostCard && (
          <CreatePostCard
            setReload={setReload}
            reload={reload}
            createPostCard={createPostCard}
            setCreatePostCard={setCreatePostCard}
          />
        )}
      </div>

      {/* SHOW SINGLE POST CARD */}
      {showSinglePost && (
        <div className="w-[100%] inset-0 bg-gradient-to-b from-[#2c5364] via-[#203a43] to-[#0f2027] fixed top-0 z-[100] min-h-screen overflow-y-auto">
          <SinglePost
            setShowSinglePost={setShowSinglePost}
            showSinglePost={showSinglePost}
            postId={postId}
            userId={userId}
            setPosts={setPosts}
            bottomSheet
          />
        </div>
      )}
    </div>
  );
}
