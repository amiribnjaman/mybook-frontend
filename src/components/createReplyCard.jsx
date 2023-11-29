"use client";

import axios from "axios";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import { useRef } from "react";

export default function CreateReplyCard({
  userId,
  commentId,
  postId,
  reload,
  setReload,
  setShowReplyField,
  showReplyField,
}) {
  const replyValue = useRef("");

  /*
   **
   ** HANDLE CREATE A REPLY
   **
   */
  const handleReplyCreate = async (e) => {
      e.preventDefault();
      
    const replayText = replyValue?.current.value;
    const data = {
      commentId: commentId,
      reply: replayText,
      postId: postId,
      userId: userId,
    };

    if (replayText) {
      await axios
        .patch(`${SERVER_URL}/post/create-reply`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setReload(!reload);
          setShowReplyField(!showReplyField);
        });
    }
  };

  return (
    <>
      <form className="flex gap-1 w-[80%]" onSubmit={handleReplyCreate}>
        <input
          className="border w-[75%] focus:outline-none focus:border px-4 py-[2px] rounded"
          ref={replyValue}
          name=""
          id=""
          placeholder="Your reply..."
        />
        <button
          type="submit"
          className="ml-2 w-[25%] inline-block text-white bg-green-600 px-3 py-1 rounded-md"
        >
          Reply
        </button>
      </form>
    </>
  );
}
