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
import TopNav from "./topNav";

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
    <TopNav />
    <hr className="w-[90%] mx-auto mt-[20px] mb-[40px] h-[.5px] bg-[#f4f4f9]" />
      {posts?.length > 0 ? (
        <></>
      ) : (
        <FeedSkeleton />
      )}
    </>
  );
}
