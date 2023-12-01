"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import { useRef } from "react";
import { useCookies } from "react-cookie";


export default function UpdateCommentCard({
  userId,
  commentId,
  postId,
  reload,
  setReload,
  showEditComField,
  setShowEditComField,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
    const [cookies, setCookie, removeCookie] = useCookies(["Token"]);


  const updateComment = useRef("");

  /*
   **
   ** HANDLE COMMENT UPDATE/EDIT
   **
   */
  const handleCommentUpdate = async (e) => {
    e.preventDefault();
    const commentText = updateComment.current.value;
    const data = {
      commentId: commentId,
      comment: commentText,
      postId: postId,
      userId: userId,
    };

    if (commentText) {
      await axios
        .patch(`${SERVER_URL}/post/update-comment`, data, {
          headers: {
            authorization: "Bearer " + cookies.Token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setReload(!reload);
          setShowEditComField(!showEditComField);
        });
    }
  };




  return (
    <>
      <form className="flex gap-1 w-[80%]" onSubmit={handleCommentUpdate}>
        <input
          className="border w-[75%] focus:outline-none focus:border px-4 py-[2px] rounded"
          type="text"
          {...register("commentUpdate", {
            required: true,
          })}
          ref={updateComment}
          name=""
          id=""
          placeholder="Write comment"
        />
        <button
          type="submit"
          className="ml-2 w-[25%] inline-block text-white bg-blue-700 px-3 py-1 rounded-md"
        >
          Edit
        </button>
      </form>
    </>
  );
}
