"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { PlusOutlined, PictureOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER_URL } from "../../SERVER_URL";
import { toast } from "react-toastify";

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

export default function Feed() {
  const [createPostCard, setCreatePostCard] = useState(false);

  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");
  // const [previewTitle, setPreviewTitle] = useState("");
  // const [fileList, setFileList] = useState([]);
  // const handleCancel = () => setPreviewOpen(false);
  require("dotenv").config();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setGetFile(file.url || file.preview);
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  //   setPreviewTitle(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  // const uploadButton = (
  //   <div>
  //     <PictureOutlined size={60} />
  //     <div
  //       style={{
  //         marginTop: 8
  //       }}
  //     ></div>
  //   </div>
  // );

  const file = useRef(null)
  const imgbbKey = "aefb8bb9063d982e8940fd31a2d29f9d";
  const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
  let imgUrl;

  // Handle post submit
  const postSubmit = async (d) => {
    const post = d.post

    // Upload image into imgbb
    const img = d.image[0]
    let formData = new FormData()
    formData.append('image', img)
    await fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      imgUrl = data.data.url;
    })

    const data = {
      post,
      imgUrl,
    };

    // POST DATA INTO SERVER
    await axios
      .post(
        `${SERVER_URL}/post/create`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.status == 201) {
            toast.success("A post uploaded.");
          }
      })
      .catch((err) => {
        console.log(err.message);
      });

reset()
  }

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
                } shadow-md border py-4 rounded-md w-[500px] fixed top-1/5 left-[0%] z-50 bg-white`}
              >
                <div className="relative py-2">
                  <h2 className="text-center text-2xl font-semibold pb-2">
                    Create Post
                  </h2>
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
