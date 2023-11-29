"use client";

import axios from "axios";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePost() {
  const { postId } = useParams();
  const navigate = useRouter();
  const [post, setPost] = useState({});
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
          setPost(data);
        }
      });
  }, [postId]);

  // Handle post submit
  const postUpdate = async (d) => {
    const postText = d.post;
    const img = d.image[0];
    const userId = localStorage.getItem("userId");

    // Return/ternimate other operation if there are nothing to update
    if (!img && (!postText || postText == post.data.post )) {
      toast.info("Nothing to update.");
      return;
    }
    

    // Upload image into imgbb
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

    imgUrl = imgUrl || post?.data.imgUrl;

    const data = {
      postId,
      post: postText,
      imgUrl,
      userId,
    };

    // POST DATA INTO SERVER
    if (img || postText) {
      await axios
        .patch(`${SERVER_URL}/post/update-post`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            toast.success(res.data.message);
            // Navigate to Home page
            navigate.push("/");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    reset();
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
          <form onSubmit={handleSubmit(postUpdate)}>
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
            <div>
              <img
                src={post.data.imgUrl}
                alt=""
                className="w-[80px] h-[80px] rounded-md"
              />
            </div>
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
