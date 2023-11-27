'use client'

import axios from "axios";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({})
console.log(post.data?.post);
  const imgbbKey = "aefb8bb9063d982e8940fd31a2d29f9d";
  const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
  let imgUrl;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // DATA FETCHING FOR SPECIFIC POST
  useEffect(() => {
    fetch(`${SERVER_URL}/post/get-one/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setPost(data)
        }
      });
  }, []);


  // Handle post submit
  const postSubmit = async (d) => {
    const post = d.post;

    const userId = localStorage.getItem("userId");

    // Upload image into imgbb
    const img = d.image[0];
    if (img) {
      let formData = new FormData();
      formData.append("image", img);
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          imgUrl = data.data.url;
        });
    }

    const data = {
      post,
      imgUrl,
      userId,
    };

    // POST DATA INTO SERVER
    if (img || post) {
      await axios
        .post(`${SERVER_URL}/post/create`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status == 201) {
            setReload(!reload);
            toast.success("A post uploaded.");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    reset();
    setCreatePostCard(!createPostCard);
  };
  return (
    <div className="border flex flex-col py-2 rounded-md">
      <div className=" py-2">
        <h2 className="text-center text-2xl font-semibold pb-2">Update Post</h2>
      </div>
      <hr />
      {/*-----------USER--------- */}
      <div className="px-4 py-2 flex gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-100"></div>
        <h4 className="font-semibold">Mr. X</h4>
      </div>
      <div className="w-full px-4">
        {/*------------- POST FORM------------ */}
        {post?.data && post?.data && (
          <form onSubmit={handleSubmit(postSubmit)}>
            <textarea
              {...register("post")}
              name="post"
              id=""
              cols="52"
              rows="5"
              className="focus:outline-none focus:border text-lg rounded-md p-2"
              placeholder="Whats on your mind? Mr.X"
            >
              {post.data?.post && post.data?.post}
            </textarea>

            <div className="my-2 flex justify-between items-center px-4 py-2 rounded-md border">
              <p>Add to your post</p>
              <div>
                <input type="file" {...register("image")} />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0866FF] py-[4px] text-xl mt-2 text-white rounded-md"
            >
              Update Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
