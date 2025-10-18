import { SERVER_URL } from "@/utilitis/SERVER_URL";
import axios from "axios";

export default async function handleFollowing(
  userId,
  targetFollowId,
  Token,
  followingState, 
  setFollowingState
) {
  setFollowingState({ isloading: true, state: "" });

  // setPost((prevPost) =>
  //   prevPost?.map((post) => {
  //     if ((post.user.id = targetFollowId)) {
  //       return {
  //         ...post,
  //         user: {
  //           ...post?.user,
  //           isFollowing: !post?.user?.isFollowing,
  //         },
  //       };
  //     }
  //     return post;
  //   })
  // );

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
        if (res?.data?.message?.includes("Followed")) {
          setFollowingState({ isloading: false, state: "following" });
        } else {
          console.log('ok')
          setFollowingState({ isloading: false, state: "unfollow" });
        }
      }
    })
    .catch((err) => {
      console.log("error", err);
      // REVERT UI IF FAIL
      // setPost((prevPost) =>
      //   prevPost?.map((post) => {
      //     if ((post.user.id = targetFollowId)) {
      //       return {
      //         ...post,
      //         user: {
      //           ...post?.user,
      //           isFollowing: !post?.user?.isFollowing,
      //         },
      //       };
      //     }
      //     return post;
      //   })
      // );
    });
}
