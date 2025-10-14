import { SERVER_URL } from "@/utilitis/SERVER_URL";
import axios from "axios";

export default async function handleUserPostInteraction(
  setPosts = [],
  postId,
  userId,
  setPost = {},
  Token,
  isSinglePost = false
) {
  // Immediate UI update for better UX on SINGLE PAGE
  // Immediate UI update for better UX
  if (isSinglePost && setPost) {
    setPost((post) => {
      const isLiked = post?.likes?.includes(userId);

      return {
        ...post,
        likes: isLiked
          ? post?.likes?.filter((like) => like !== userId)
          : [...post?.likes, userId],
      };
    });

    // Immediate UI Revert if fail
    setPosts((prevPost) =>
      prevPost.map((post) => {
        if (post?.id === postId) {
          // console.log('inside', userId, post?.likes.map(p => p === userId));

          const isLiked = post?.likes?.includes(userId);

          return {
            ...post,
            likes: isLiked
              ? post?.likes?.filter((like) => like !== userId)
              : [...post?.likes, userId],
          };
        }
        return post;
      })
    );
  } else {
    // Immediate UI Revert if fail
    setPosts((prevPost) =>
      prevPost.map((post) => {
        if (post?.id === postId) {
          // console.log('inside', userId, post?.likes.map(p => p === userId));

          const isLiked = post?.likes?.includes(userId);

          return {
            ...post,
            likes: isLiked
              ? post?.likes?.filter((like) => like !== userId)
              : [...post?.likes, userId],
          };
        }
        return post;
      })
    );
  }

  // Server operation - User interaction submit on Server
  await axios
    .patch(
      `${SERVER_URL}/post/interaction`,
      { postId, userId },
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

      // Immediate UI update for better UX
      if (isSinglePost && setPost) {
        setPost((post) => {
          const isLiked = post?.likes?.includes(userId);

          return {
            ...post,
            likes: isLiked
              ? post?.likes?.filter((like) => like !== userId)
              : [...post?.likes, userId],
          };
        });

        // Immediate UI Revert if fail
        setPosts((prevPost) =>
          prevPost.map((post) => {
            if (post?.id === postId) {
              // console.log('inside', userId, post?.likes.map(p => p === userId));

              const isLiked = post?.likes?.includes(userId);
              console.log("isLiked", isLiked);

              return {
                ...post,
                likes: [...post?.likes, userId],
              };
            }
            return post;
          })
        );
      } else {
        // Immediate UI Revert if fail
        setPosts((prevPost) =>
          prevPost.map((post) => {
            if (post?.id === postId) {
              // console.log('inside', userId, post?.likes.map(p => p === userId));

              const isLiked = post?.likes?.includes(userId);

              return {
                ...post,
                likes: isLiked
                  ? post?.likes?.filter((like) => like !== userId)
                  : [...post?.likes, userId],
              };
            }
            return post;
          })
        );
      }
    });
}
