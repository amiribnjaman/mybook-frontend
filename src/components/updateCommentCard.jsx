'use client'

import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import { useRef } from "react";


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
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res, reload);
          setReload(!reload);
          setShowEditComField(!showEditComField);
          console.log(reload);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleCommentUpdate}>
        <input
          className="border focus:outline-none focus:border px-4 py-[2px] rounded"
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
          className="ml-2 inline-block text-white bg-green-600 px-6 py-1 rounded-md"
        >
          Edit
        </button>
      </form>
    </>
  );
}
