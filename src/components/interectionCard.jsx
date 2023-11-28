import { useState } from "react";

export default function InterectionCard({
  userId,
  postId,
  showIntercectionCard,
  setShowInterectionCard,
}) {
  const [interectionValue, setInterectionValue] = useState(false);

  console.log(interectionValue, postId);

  /*
   **
   ** HANDLE CREATE A REPLY
   **
   */
  const handleInterectionSubmit = async (e) => {
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
    <div
      className={`${
        showIntercectionCard ? "flex" : "hidden"
      } absolute bottom-8 left-1 z-50  shadow-md rounded bg-white flex gap-4 w-1/2 px-3 py-2 ml-1 mb-2 justify-center`}
    >
      <button
        onClick={() => setInterectionValue("like")}
        className="text-blue-500 hover:underline"
      >
        Like
      </button>
      <button
        onClick={() => setInterectionValue("love")}
        className="text-red-500 hover:underline"
      >
        Love
      </button>
      <button
        onClick={() => setInterectionValue("angry")}
        className="text-yellow-500 hover:underline"
      >
        Angry
      </button>
    </div>
  );
}
