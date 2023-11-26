import axios from "axios";
import { SERVER_URL } from "../utilitis/SERVER_URL";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";

export default function CreatePostCard({ createPostCard, setCreatePostCard }) {
  const imgbbKey = "aefb8bb9063d982e8940fd31a2d29f9d";
  const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
  let imgUrl;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Handle post submit
  const postSubmit = async (d) => {
    const post = d.post;

    // Upload image into imgbb
    const img = d.image[0];
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

    const data = {
      post,
      imgUrl,
    };

    // POST DATA INTO SERVER
    await axios
      .post(`${SERVER_URL}/post/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.status == 201) {
          toast.success("A post uploaded.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    reset();
    setCreatePostCard(!createPostCard);
  };
  return (
    <>
      <div className="relative py-2">
        <h2 className="text-center text-2xl font-semibold pb-2">Create Post</h2>
        <div
          onClick={() => setCreatePostCard(!createPostCard)}
          className="absolute top-[8px] right-[10px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-9 h-9 cursor-pointer bg-[#D8DADF] rounded-full p-1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <hr />
      {/*-----------USER--------- */}
      <div className="px-4 py-2 flex gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-100"></div>
        <h4 className="font-semibold">Mr. X</h4>
      </div>
      <div className="w-full px-4">
        {/*------------- POST FORM------------ */}
        <form onSubmit={handleSubmit(postSubmit)}>
          <textarea
            {...register("post")}
            name="post"
            id=""
            cols="58"
            rows="5"
            className="focus:outline-none focus:border rounded-md p-2"
            placeholder="Whats on your mind?"
          ></textarea>

          <div className="my-2 flex justify-between items-center px-4 py-2 rounded-md border">
            <p>Add to your post</p>
            <div>
              <input type="file" {...register("image")} />
              {/* <Upload
                          {...register("img")}
                          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                          listType="picture-circle"
                          fileList={fileList}
                          onPreview={handlePreview}
                          onChange={handleChange}
                          className="w-9 h-9"
                        >
                          {fileList.length > 0 ? null : uploadButton}
                        </Upload> */}

              {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg> */}
            </div>
          </div>

          {/*---------------SELECTED IMAGES---------- */}
          <div>
            {/* <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                        className="w-4 h-4"
                      >
                        <img
                          alt="example"
                          style={{
                            width: "100%",
                          }}
                          src={previewImage}
                        />
                      </Modal> */}
          </div>
          <button
            type="submit"
            className="w-full bg-[#0866FF] py-[4px] text-xl mt-2 text-white rounded-md"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
}
