import { SERVER_URL } from "@/utilitis/SERVER_URL";
import axios from "axios";

export default async function handleFollowing(
  posts,
  setPosts,
  userId,
  targetFollowId,
  Token
) {


  console.log(posts)
  // IMMEDIATE UI CHANGE FOR BETTER UX
  setPosts((prevPosts) => {
    prevPosts.map((post) => {
      if (post?.userId == targetFollowId) {
        return {
          ...post,
          user: {
            ...post.user,
            isFollowing: !post.user.isFollowing,
          },
        };
      }
      return post;
    }
    )
  })

  // SERVER/API OPERATION
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
      // REVERT UI IF FAIL
  setPosts(prevPosts => {
    prevPosts.map(post => 
      post.user.id == targetFollowId ? {
        ...post, 
        user: {
          ...post.user,
          isFollowing: !post.user.isFollowing
        }
      } : post
    )
  })
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
