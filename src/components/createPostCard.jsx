import axios from "axios";
import { SERVER_URL } from "../utilitis/SERVER_URL";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";


export default function CreatePostCard({ createPostCard, setCreatePostCard, reload, setReload }) {
  const imgbbKey = "aefb8bb9063d982e8940fd31a2d29f9d";
  const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
  let imgUrl;
    const [cookies, setCookie, removeCookie] = useCookies(["Token"]);


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Handle post submit
  const postSubmit = async (d) => {
    const post = d.post;

    const userId = localStorage.getItem("userId")

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
      userId
    };

    // POST DATA INTO SERVER
    if (img || post) {
      await axios
        .post(`${SERVER_URL}/post/create`, data, {
          headers: {
            authorization: "Bearer " + cookies.Token,
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
            cols="52"
            rows="5"
            className="focus:outline-none focus:border text-lg rounded-md p-2"
            placeholder="Whats on your mind? Mr.X"
          ></textarea>

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
            Post
          </button>
        </form>
      </div>
    </>
  );
}
