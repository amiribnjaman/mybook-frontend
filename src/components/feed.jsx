"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { PlusOutlined, PictureOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import CreatePostCard from '@/components/createPostCard'

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

export default function Feed() {
  const [createPostCard, setCreatePostCard] = useState(false);


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
              <button
                onClick={() => setCreatePostCard(!createPostCard)}
                className="bg-[#F0F2F5] text-[17px] hover:bg-[#E4E6E9] text-[#606266] w-full text-left px-4 py-2 px-3 rounded-full"
              >
                What's on your mind? Mr. X
              </button>

              {/* =========================== */}
              {/*----------------CREATE POST CARD------------------ */}
              <div
                className={`${
                  createPostCard ? "block" : "hidden"
                } shadow-md border py-4 rounded-md w-[500px] fixed top-[10%] left-[3px] z-50 bg-white`}
              >
                <CreatePostCard
                  createPostCard={createPostCard}
                  setCreatePostCard={setCreatePostCard}
                />
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
