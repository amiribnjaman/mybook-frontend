"use client";

import Link from "next/link";

export default function Feed() {
  return (
    <>
      {/*=============== CREATE POST SECTION================ */}
      <div className="bg-white w-[90%] mx-auto px-2 py-3 shadow border rounded-md">
        <div className="mx-3 ">
          <div className="flex gap-2 justify-between mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-100"></div>
            {/*------------- POST FORM-------------- */}
            <div className="w-[85%]">
              <form action="" className="flex items-center">
                <textarea
                  name=""
                  id=""
                  cols="55"
                  rows=""
                  placeholder="Whats on your mind?"
                  className="bg-[#F0F2F5] px-3 rounded-full"
                ></textarea>
              </form>
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
