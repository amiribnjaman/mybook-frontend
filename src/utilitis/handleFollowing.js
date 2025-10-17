import { SERVER_URL } from "@/utilitis/SERVER_URL";
import axios from "axios";

export default async function handleFollowing(
  userId,
  targetFollowId,
  Token
) {
  console.log("token", userId, targetFollowId);

  await axios
    .patch(
      `${SERVER_URL}/user/toggle-follow`,
      { userId, targetFollowId },
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
        console.log("res", res.data);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });

  // Immadiate UI Update
  // setPosts((prevPosts) =>
  //   prevPosts.map((post) => {

  //     if (post.id === postId) {
  //       const isFollowing = post.followers.includes(currentUserId);
  //       let updatedFollowers;
  //       if (isFollowing) {
  //         updatedFollowers = post.followers.filter((id) => id !== currentUserId);
  //       } else {
  //         updatedFollowers = [...post.followers, currentUserId];
  //       }
  //       return { ...post, followers: updatedFollowers };
  //     }
  //     return post;
  //   })
  // );
}
