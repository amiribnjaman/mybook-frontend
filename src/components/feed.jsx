"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CreatePostCard from "@/components/createPostCard";
import Image from "next/image";
import { UserOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { SERVER_URL } from "@/utilitis/SERVER_URL";

export default function Feed() {
  const [createPostCard, setCreatePostCard] = useState(false);
  const [posts, setPosts] = useState([])
  console.log(posts)


  // POST DATA FETCHING
  useEffect(() => {
    fetch(`${SERVER_URL}/post/allpost`)
      .then((res) => res.json())
      .then(data => {
        if (data.status == 200) {
          setPosts(data.data)
        }
      })
  }, []);


  return (
    <>
      {/*=============== CREATE POST SECTION================ */}
      <div
        className={`${
          createPostCard ? "backdrop-blur-md" : ""
        } bg-white w-[90%] mr-auto px-2 py-3 shadow border rounded-md`}
      >
        <div className="mx-3 ">
          <div className="flex gap-2 justify-between mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-100"></div>
            <div className="w-[87%]">
              <button
                onClick={() => setCreatePostCard(!createPostCard)}
                className="bg-[#F0F2F5] text-[18px] hover:bg-[#E4E6E9] text-[#606266] w-full text-left px-4 py-2 px-3 rounded-full"
              >
                What's on your mind? Mr. X
              </button>

              {/* =========================== */}
              {/*--------------CREATE POST CARD-------------- */}
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

      {/*========================NEWS FEED========================*/}
      {posts.length > 0 &&
        posts.map((post) => (
          <div className="mt-6 w-[90%] py-6 mr-auto rounded-md border shadow">
            {/*---------POST HEADEING------------*/}
            {/*----------USER------------ */}
            <div className="flex justify-between px-4">
              <div className="flex gap-3">
                {/* <Image
              src={''}
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            /> */}
                <div className="w-[40px] cursor-pointer h-[40px] rounded-full bg-gray-200 flex items-center justify-center">
                  <UserOutlined size={50} />
                </div>
                <div>
                  <h3 className="font-semibold m-0">
                    <Link href="">
                      {post?.userName ? post?.userName : "Mr. X"}
                    </Link>
                  </h3>
                  <span className="text-[12px] text-gray-500 -mt-4 inline-block font-normal">
                    At {post?.createOn.split("T")[1].split(".")[0]},{" "}
                    {post?.createOn.split("T")[0]}
                  </span>
                </div>
              </div>
              <div>
                <Button type="text">
                  <EllipsisOutlined
                    style={{ fontSize: "22px", fontWeight: "semi-bold" }}
                  />
                </Button>
              </div>
            </div>

            {/*---------POST CONTENT----------- */}
            <div>
              <p className="my-3 px-4">{post?.post && post?.post}</p>
              <div className="mb-4">
                <img src={post?.imgUrl && post?.imgUrl} alt="" />
                {/* <Image height={500} width={500} alt="" src={post.imgUrl} /> */}
              </div>
            </div>

            {/*------------SHOWING INTERECTION COUNT----------- */}
            <p className="px-4">
              {post?.likes?.length && post?.likes?.length + "Likes"}{" "}
            </p>
            {/*------------USER INTERECTION INTO POST---------- */}
            <hr />
            <div className="my-2 px-4 flex justify-between">
              <Button>Like</Button>
              <Button>Comment</Button>
              <Button>Share</Button>
            </div>
            <hr />
          </div>
        ))}
    </>
  );
}
