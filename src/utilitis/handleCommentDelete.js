import { SERVER_URL } from "@/utilitis/SERVER_URL";
import axios from "axios";

export default async function handleCommentDelete(
    commentUser,
  userId,
  postId,
  commentId,
  Token,
  setLoading,
  setReloadPost,
  reloadPost
) {
  console.log(userId, commentUser);
  setLoading(true);
  await axios
    .delete(
      `${SERVER_URL}/post/deleteComment/${userId}/${commentId}/${postId}`,
      {
        headers: {
          authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        setReloadPost(!reloadPost);
        console.log("res", res.data);
      } else {
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}
