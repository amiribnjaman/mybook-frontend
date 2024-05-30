"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CreatePostCard from "@/components/createPostCard";
import Image from "next/image";
import {
  UserOutlined,
  EllipsisOutlined,
  LikeOutlined,
  LikeFilled,
  HeartFilled,
  FrownFilled,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import { useForm } from "react-hook-form";
import axios from "axios";
import UpdateCommentCard from "./updateCommentCard";
import CreateReplyCard from "./createReplyCard";
import InterectionCard from "./interactionCard";
import FeedSkeleton from "@/loadingComments/feedSkeleton";
import { useCookies } from "react-cookie";

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
    userId = localStorage.getItem("userId");
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
          setPosts(data.data);
        }
      });
  }, [reload]);

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
          console.log(res.status)
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
  const handleUserPostInteraction = (type, post, length = null) => {
    const findLike = post.Likes.find((like) => like.userId == userId);
    if (type == "like") {
      if (findLike?.userId == userId) {
        if (findLike?.likeType == "Love") {
          return <HeartFilled style={{ fontSize: "26px", color: "#D61355" }} />;
        } else if (findLike?.likeType == "Angry") {
          return <FrownFilled style={{ fontSize: "26px", color: "#FF9551" }} />;
        } else {
          return <LikeFilled style={{ fontSize: "26px", color: "#0866FF" }} />;
        }
      } else {
        return (
          <p className="font-normal text-black">
            <LikeOutlined style={{ fontSize: "24px", color: "#0866FF" }} />
          </p>
        );
      }
    } else if (type == "count") {
      if (findLike?.userId == userId && length > 1) {
        return "You and " + (length - 1) + " other people like this";
      } else if (findLike?.userId == userId && length == 1) {
        return `You ${findLike?.likeType} this`;
      } else if (findLike?.userId != userId && length > 0) {
        return length + " people like this";
      }
    }
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
    <>
      {posts?.length > 0 ? (
        <div>
          {/*======================= CREATE POST SECTION================ */}
          <div
            className={`${
              createPostCard ? "backdrop-blur-md" : ""
            } bg-white w-full mr-auto px-2 py-3 shadow border rounded-md`}
          >
            <div className="mx-3 ">
              <div className="flex gap-2 justify-between mb-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                  <Avatar size={45} icon={<UserOutlined />} />
                </div>
                <div className="w-[87%]">
                  <button
                    onClick={() => setCreatePostCard(!createPostCard)}
                    className="bg-[#F0F2F5] text-[18px] hover:bg-[#E4E6E9] text-[#606266] w-full text-left px-4 py-2 px-3 rounded-full"
                  >
                    What&#39;s on your mind? Mr. X
                  </button>

                  {/* ====================================================== */}
                  {/*--------------------CREATE POST CARD------------------- */}
                  <div
                    className={`${
                      createPostCard ? "block" : "hidden"
                    } shadow-md border py-4 rounded-md w-[500px] fixed top-[10%] left-[3px] z-50 bg-white`}
                  >
                    {/*-----CREATE POST COMPONENT----- */}
                    <CreatePostCard
                      reload={reload}
                      setReload={setReload}
                      createPostCard={createPostCard}
                      setCreatePostCard={setCreatePostCard}
                    />
                  </div>
                </div>
              </div>
              <hr />

              {/*------------- POST TYPES---------- */}
              <div>
                <ul className="flex font-semibold text-gray-500 justify-between py-3">
                  <li>Live video</li>
                  <li>Photo/video</li>
                  <li>Felling/activity</li>
                </ul>
              </div>
            </div>
          </div>

          {/*================================NEWS FEED========================*/}
          {posts?.length > 0 &&
            posts?.map((post, index) => (
              <div
                key={index}
                className={`${
                  createPostCard ? "-z-50" : ""
                } mt-6 mb-8 w-full relative py-6 mr-auto rounded-md border shadow bg-white`}
              >
                {/*----------------POST HEADEING------------*/}
                {/*----------------USER------------ */}
                <div className="flex justify-between px-4">
                  <div className="flex gap-3">
                    <div className="w-[40px] cursor-pointer h-[40px] rounded-full bg-gray-200 flex items-center justify-center">
                      <UserOutlined size={50} />
                    </div>
                    <div>
                      <h3 className="font-semibold m-0">
                        <Link href="">
                          {post?.userName ? post?.userName : "Mr. X"}
                        </Link>
                      </h3>
                      <span className="text-[12px] text-gray-500 -mt-4 inline-block font-normal">
                        At {post?.createOn.split("T")[1].split(".")[0]},{" "}
                        {post?.createOn.split("T")[0]}
                      </span>
                    </div>
                  </div>
                  {/*-----------------POST HEADING RIGHT SIDE ELLIPSIS/DOTTED BAR------------------ */}
                  <div>
                    <Button
                      onClick={() =>
                        handlerCommonFunction(
                          post?.id,
                          setPostIdForMoreAction,
                          "",
                          "",
                          moreOption,
                          setMoreOption
                        )
                      }
                      type="text"
                    >
                      <EllipsisOutlined
                        style={{ fontSize: "22px", fontWeight: "semi-bold" }}
                      />
                    </Button>
                    {/*-------------------MORE OPTION CARD------------ */}
                    {/*
                     **
                     **IF LOOPING POST.ID AND CLICK TIME ID IS EQUELD THEN THE MORE OPTION CARD
                     **
                     */}
                    {post?.id == postIdForMoreAction && (
                      <div
                        className={`${
                          moreOption ? "block" : "hidden"
                        } absolute border px-4 py-6 rounded-md shadow-md flex flex-col gap-3 bg-white top-[55px] right-[10px]`}
                      >
                        {/*
                         **
                         **IF USER.ID AND POST.USERID IS EQUELD THEN BUTTON WILLBE CLICKABLE
                         **
                         */}
                        {userId == post?.userId ? (
                          <>
                            <button>
                              <Link
                                href={`/update-post/${postIdForMoreAction}`}
                              >
                                Edit
                              </Link>
                            </button>
                            <button onClick={handleDeletePost}>Delete</button>
                          </>
                        ) : (
                          <>
                            <button
                              disabled
                              className="cursor-not-allowed text-gray-300"
                            >
                              Edit
                            </button>
                            <button
                              disabled
                              className="cursor-not-allowed text-gray-300"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/*----------------POST CONTENT----------- */}
                {/*
                 **
                 **SHOWING POST CONTENT (POST & IMAGE)
                 **
                 */}
                <div>
                  <p className="my-3 px-4">{post?.post && post?.post}</p>
                  <div className="mb-4">
                    <img src={post?.imgUrl && post?.imgUrl} alt="" />
                    {/* <Image height={500} width={500} alt="" src={post.imgUrl} /> */}
                  </div>
                </div>

                {/*------------USER INTERECTION INTO POST---------- */}
                {/*
                 **
                 ** SHOWING USER INTERACTION/LIKES
                 ** SENDING TYPE- COUNT, THE POST AND POST TOTAL LIKES/INTERACTION LENGTH AS ARGUMENTS
                 **
                 */}
                <p className="px-4 text-[13px] font-semibold mb-1">
                  {post?.Likes.length > 0
                    ? handleUserPostInteraction(
                        "count",
                        post,
                        post?.Likes.length
                      )
                    : "No Like"}
                </p>
                <hr />
                <div className="my-2 px-4 flex justify-between relative">
                  {/*
                   **
                   ** USER INTERACTION CARD
                   **
                   */}
                  {postId == post?.id && (
                    <InterectionCard
                      userId={userId}
                      postId={postId}
                      setReload={setReload}
                      reload={reload}
                      showIntercectionCard={showIntercectionCard}
                      setShowInterectionCard={setShowIntercectionCard}
                    />
                  )}
                  <Button
                    type="text"
                    onClick={() =>
                      handlerCommonFunction(
                        post?.id,
                        setPostId,
                        "",
                        "",
                        showIntercectionCard,
                        setShowIntercectionCard
                      )
                    }
                  >
                    {/*
                     **
                     **CHECKING IS USER LIKED THIS POST OR NOT
                     ** SEND TYPE- LIKE AND THE POST AS ARGUMENTS
                     **
                     */}
                    {post?.Likes.length > 0 ? (
                      handleUserPostInteraction("like", post)
                    ) : (
                      <LikeOutlined
                        style={{ fontSize: "24px", color: "#0866FF" }}
                      />
                    )}
                  </Button>
                  <Button
                    onClick={() =>
                      handlerCommonFunction(
                        post?.id,
                        setPostId,
                        "",
                        "",
                        showCommentBox,
                        setShowCommentBox
                      )
                    }
                  >
                    Comment
                  </Button>
                  <Button>Share</Button>
                </div>
                <hr />
                {/*---------------COMMENT SECTION------------ */}
                <div className="px-4 my-2">
                  {/*
                   **
                   **IF COMMENT HAS LENGHT THEN SHOW COMMENT AMOUNT & CONTENT
                   **
                   */}
                  {post?.comments.length > 0 && (
                    <button
                      onClick={() =>
                        handlerCommonFunction(
                          post?.id,
                          setPostId,
                          "",
                          "",
                          showComments,
                          setShowComments
                        )
                      }
                      className="font-semibold my-3 hover:underline"
                    >
                      {post?.comments.length + " Comments"}
                    </button>
                  )}

                  {/*
                   **
                   **IF CLICKED POST.ID AND LOOPING POST.ID IS EQUIED THEN SHOW THE COMMENTS FOR THE SPECIFIC POST
                   **
                   */}
                  {post?.id == postId && post?.comments.length > 0 && (
                    <div className={`${showComments ? "block" : "hidden"}`}>
                      {/*
                       **
                       ** LOOPING POST COMMENTS
                       **
                       */}
                      {post?.comments.map((com, index) => (
                        <div
                          key={index}
                          className="px-4 my-4 flex flex-col gap-2"
                        >
                          <div className="flex  gap-2">
                            <div className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-gray-200">
                              <UserOutlined size={25} />
                            </div>
                            <div className="">
                              <h4 className="font-semibold">Mr. X</h4>
                              <p className="font-normal text-gray-600 text-[14px]">
                                {com?.comment}
                              </p>
                              <div className="flex justify-between gap-3 mt-1 items-center">
                                <div className="flex gap-3 mt-1 items-center">
                                  {/*
                                   **
                                   **IF LOOPING LOGEDIN USERID AND CLICK COMMENT USER.ID IS EQUELD THEN EDIT/DELETE BUTTONS WILLBE CLICKABLE
                                   **
                                   */}
                                  {/*
                                   **
                                   **LIKE BUTTON
                                   **
                                   */}
                                  <div className="flex items-center gap-2 justify-center mt-1 ">
                                    <button
                                      onClick={() =>
                                        handleCommentLikeSubmit(
                                          post?.id,
                                          com?.id
                                        )
                                      }
                                      className="text-[12px] font-semibold hover:underline"
                                    >
                                      Like
                                    </button>
                                  </div>
                                  {userId == com?.userId ? (
                                    <div className="flex flex-col mt-1 ">
                                      <div className="flex gap-x-3 order-last">
                                        <button
                                          onClick={() =>
                                            handlerCommonFunction(
                                              post?.id,
                                              setCommentPostId,
                                              com?.id,
                                              setCommentId,
                                              showEditComField,
                                              setShowEditComField
                                            )
                                          }
                                          className="text-[12px] font-semibold hover:underline"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleCommentDelete(
                                              post.id,
                                              com?.id
                                            )
                                          }
                                          className="text-[12px] font-semibold hover:underline"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex gap-x-3 mt-1">
                                      <button
                                        className="text-[12px] cursor-not-allowed text-gray-400 font-semibold"
                                        disabled
                                      >
                                        Edit
                                      </button>
                                      <button
                                        disabled
                                        onClick={() =>
                                          handleCommentDelete(com?.id)
                                        }
                                        className="text-[12px] cursor-not-allowed text-gray-400 font-semibold"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}

                                  {/*
                                   **
                                   **REPLY BUTTON
                                   **
                                   */}
                                  <div className="flex mt-1 ml-0">
                                    <button
                                      onClick={() =>
                                        handlerCommonFunction(
                                          post?.id,
                                          setCommentPostId,
                                          com?.id,
                                          setCommentId,
                                          showReplyField,
                                          setShowReplyField
                                        )
                                      }
                                      className="text-[12px] font-semibold hover:underline"
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/*
                             **
                             **COMMENTS LIKE COUNTER
                             **
                             */}
                            <div className="ml-auto mt-auto flex items-center">
                              {com?.Likes?.length > 0 && (
                                <p className="text-[12px] font-bold text-blue-600">
                                  {com?.Likes?.length}{" "}
                                  <LikeFilled style={{ fontSize: "13px" }} />
                                </p>
                              )}
                            </div>
                          </div>

                          {/* ---------------------COMMENT EDIT CARD------------ */}
                          {/*
                           **
                           **IF CLICK TIME COMMENT ID AND LOOPING COMMENT ID IS EQUELD THEN SHOW COMMNET EDIT FORM THE SPECIFIC COMMENT
                           **
                           */}
                          {commentId == com.id && (
                            //--------------EDIT/UPDATE COMMENT FORM------------------
                            <div
                              className={`${
                                showEditComField ? "block" : "hidden"
                              } order-1 w-[87%] ml-9`}
                            >
                              {/*--------EDIT/UPDATE COMMENT FORM------ */}
                              <UpdateCommentCard
                                userId={userId}
                                commentId={commentId}
                                postId={commentPostId}
                                reload={reload}
                                setReload={setReload}
                                setShowEditComField={setShowEditComField}
                                showEditComField={showEditComField}
                              />
                            </div>
                          )}

                          {/*
                           **
                           **REPLY FORM CARD
                           **IF CLICKED COMMENTID & LOOPING COMMENT.ID IS EQUELD THEN SHOW THE COMMENT FOR THE SPECIFIC COMMENT
                           **
                           */}
                          {commentId == com.id && (
                            <div
                              className={`${
                                showReplyField ? "block" : "hidden"
                              } w-[87%] ml-9`}
                            >
                              {/*
                               **
                               **CREATE REPLY CARD COMPONENT
                               **
                               */}
                              <CreateReplyCard
                                userId={userId}
                                commentId={commentId}
                                postId={commentPostId}
                                reload={reload}
                                setReload={setReload}
                                setShowReplyField={setShowReplyField}
                                showReplyField={showReplyField}
                              />
                            </div>
                          )}

                          {/*
                           **
                           **SHOW REPLIES
                           **SHOWING REPLIES AMOUNT BUTTON FOR REPLIES SHOW
                           **
                           */}
                          {com?.replies?.length > 0 && (
                            <>
                              <button
                                onClick={() =>
                                  handlerCommonFunction(
                                    com?.id,
                                    setCommentId,
                                    "",
                                    "",
                                    showReplies,
                                    setShowReplies
                                  )
                                }
                                className="font-semibold text-[12px] mt-[-6px] block ml-9 text-left hover:underline"
                              >
                                {com?.replies?.length} replies.
                              </button>

                              {/*
                               **
                               **SHOW REPLIES CARD
                               **IF CLICKED COMMENT.ID & LOOPING COMMENT.ID IS EQUELD THEN SHOW THE REPLIES FOR THE SPECIFIC COMMENT
                               **
                               */}
                              {commentId == com?.id &&
                                com?.replies.map((reply, index) => (
                                  <div
                                    key={index}
                                    className={`${
                                      showReplies ? "block" : "hidden"
                                    } ml-12 mt-1 flex gap-2`}
                                  >
                                    <div className="w-[25px] h-[25px] flex items-center justify-center rounded-full bg-gray-200 mt-1">
                                      <UserOutlined size={15} />
                                    </div>
                                    <div className="">
                                      <h4 className="font-semibold text-[14px]">
                                        Mr. X
                                      </h4>
                                      <p className="font-normal text-gray-600 text-[14px]">
                                        {reply?.reply}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {/*
                   **
                   **IF LOOPING POST.ID AND CLICK TIME POST.ID IS EQUELD THEN THE WRITE COMMENT FORM
                   **
                   */}
                  {post.id == postId && (
                    //--------------WRITE COMMENT FORM------------------
                    <form
                      className={`${showCommentBox ? "block" : "hidden"}`}
                      onSubmit={handleSubmit(createComment)}
                    >
                      <input
                        {...register("comment", { required: true })}
                        className="w-full py-4 px-6 border rounded-md focus:outline-none focus:border"
                        type="text"
                        placeholder="write comment.."
                      />
                      <input
                        {...register("postId")}
                        className="hidden w-full py-4 px-6 rounded-md focus:outline-none focus:border"
                        type="text"
                        value={post?.id}
                        placeholder="write comment.."
                      />
                      <button
                        type="submit"
                        className="bg-[#0866FF] px-4 py-1 mt-2 rounded-md text-white"
                      >
                        Comment
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <FeedSkeleton />
      )}
    </>
  );
}
