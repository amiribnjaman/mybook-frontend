"use client";

import Link from "next/link";
import { useState } from "react";

export default function Feed() {
  const [createPostCard, setCreatePostCard] = useState(true);
  return (
    <>
      {/*=============== CREATE POST SECTION================ */}
      <div
        className={`${
          createPostCard ? "backdrop-blur-md" : ""
        } bg-white w-[90%] mx-auto px-2 py-3 shadow border rounded-md`}
      >
        <div className="mx-3 ">
          <div className="flex gap-2 justify-between mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-100"></div>
            <div className="w-[87%]">
              <button className="bg-[#F0F2F5] text-[17px] hover:bg-[#E4E6E9] text-[#606266] w-full text-left px-4 py-2 px-3 rounded-full">
                What's on your mind? Mr. X
              </button>

              {/*----------------CREATE POST CARD------------------ */}
              <div className="shadow-md border py-4 rounded-md w-[500px] fixed top-2/5 left-[2%] z-50 bg-white">
                <h2 className="text-center text-2xl font-semibold pb-2">
                  Create Post
                </h2>
                <hr />
                {/*-----------USER--------- */}
                <div className="px-4 py-2 flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                  <h4 className="font-semibold">Mr. X</h4>

                </div>
              </div>
            </div>
          </div>
          <hr />

          {/*------------- POST TYPES---------- */}
          <div>
            <ul className="flex font-semibold text-gray-500 justify-between py-3">
              <li>Live video</li>
              <li>Photo/video</li>
              <li>Felling/activity</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 w-[90%] px-4 py-6 mx-auto rounded-md border shadow">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link href="">
                <img
                  className="postProfileImg"
                  src=""
                  // {
                  //   user.profilePicture
                  //     ? PF + user.profilePicture
                  //     : PF + "person/noAvatar.png"
                  // }
                  alt=""
                />
              </Link>
              <span className="postUsername">{/* {user.username} */}</span>
              <span className="postDate">{/* {format(post.createdAt)} */}</span>
            </div>
            <div className="postTopRight">{/* <MoreVert /> */}</div>
          </div>
          <div className="postCenter">
            <span className="postText">{/* {post?.desc} */}</span>
            <img
              className="postImg"
              src=""
              //   {PF + post.img} alt=""
            />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src=""
                // {`${PF}like.png`}
                onClick=""
                // {likeHandler}
                alt=""
              />
              <img
                className="likeIcon"
                //   src={`${PF}heart.png`}
                //   onClick={likeHandler}
                alt=""
              />
              <span className="postLikeCounter">
                {/* {like} */}
                people like it
              </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">
                {/* {post.comment} */}
                comments
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
