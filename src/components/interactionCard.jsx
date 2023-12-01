import { SERVER_URL } from "@/utilitis/SERVER_URL";
import axios from "axios";
import { useState } from "react";

export default function InterectionCard({
  userId,
  postId,
  showIntercectionCard,
  setShowInterectionCard,
  setReload,
  reload,
}) {
  const [interectionValue, setInterectionValue] = useState(false);

  /*
   **
   ** HANDLE POST INTERACTION SUBMIT
   **
   */
  const handleInteractionSubmit = async (value) => {
    setInterectionValue(value);

    const data = {
      likeType: value,
      postId: postId,
      userId: userId,
    };

    if (value) {
      await axios
        .patch(`${SERVER_URL}/post/post-likes`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setReload(!reload);
          setShowInterectionCard(!showIntercectionCard);

          /*
           **
           ** THIS IIFE FUNCTION PUSH A NEW NOTIFICATION
           **
           */
          (async () => {
            if (res.data.status == "201") {
              // PUSH A NEW NOTIFICATION
              await axios
                .patch(
                  `${SERVER_URL}/user/notification`,
                  {
                    userId,
                    postId,
                    type: "like",
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  console.log("ok");
                });
            }
          })();
        });
    }
  };

  return (
    <div
      className={`${
        showIntercectionCard ? "flex" : "hidden"
      } absolute bottom-8 left-1  shadow-md rounded bg-white flex gap-4 w-1/2 px-3 py-2 ml-1 mb-2 justify-center`}
    >
      <button
        onClick={() => handleInteractionSubmit("Like")}
        className="text-blue-500 hover:underline"
      >
        Like
      </button>
      <button
        onClick={() => handleInteractionSubmit("Love")}
        className="text-red-500 hover:underline"
      >
        Love
      </button>
      <button
        onClick={() => handleInteractionSubmit("Angry")}
        className="text-yellow-500 hover:underline"
      >
        Angry
      </button>
    </div>
  );
}
