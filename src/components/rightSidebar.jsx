"use client";

import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import axios from "axios";

export default function RightSidebar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
  const [notification, setNotification] = useState([]);
  const [reload, setReload] = useState(false);
  const [showNotificationCard, setShowNotificationCard] = useState(false);

  let userId;
  /*
   **
   ** GETTING LOGEDIN USER-ID FROM LOCALSTORAGE
   **
   */
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }
  /*
   **
   ** FETCHING ALL POST
   **
   */
  useEffect(() => {
    fetch(`${SERVER_URL}/user/get-notification/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "200") {
          setNotification(data.data[0].notification);
        }
      });
  }, [reload]);

  // Handle logout button
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setCookie("Token", "");
    navigate.push("/login");
  };

  /*
   **
   ** SHOW NOTIFICATION BUSINESS LOGIC HANDLER FUNCTION
   **
   */
  const showNotification = () => {
    const likeUnread = notification?.filter(
      (notification) =>
        notification?.like == true && notification?.read == false
    );

    const likeRead = notification?.filter(
      (notification) => notification?.like == true && notification?.read == true
    );
    const commentUnread = notification?.filter(
      (notification) =>
        notification?.comment == true && notification?.read == false
    );
    const commentRead = notification?.filter(
      (notification) =>
        notification?.comment == true && notification?.read == true
    );

    const totalUnread = notification?.filter(
      (notification) => notification?.read == false
    );

    return { totalUnread, likeUnread, commentUnread, likeRead, commentRead };
  };

  /*
   **
   ** HANDLE READ NOTIFICATION
   **
   */
  const handleReadNotification = async () => {
    await axios
      .patch(
        `${SERVER_URL}/user/read-notification`,
        {
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.status == "200") {
          setReload(!reload);
        }
      });
  };


  return (
    <div className="sidebar overflow-x-hidden fixed">
      <div className="flex gap-3 ">
        {/* Grid */}
        <div className="dropdown dropdown-end md:flex gap-2 items-center hidden">
          <label tabIndex={0} className="cursor-pointer">
            <div className="indicator flex gap-[3px] p-3 bg-gray-200 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.2em"
                viewBox="0 0 320 512"
              >
                <path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z" />
              </svg>
              <svg
                className="ml-[-8px]"
                xmlns="http://www.w3.org/2000/svg"
                height="1.2em"
                viewBox="0 0 320 512"
              >
                <path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z" />
              </svg>
            </div>
          </label>
            {/* <span>Feed</span> */}
        </div>
        {/* Message */}
        <div className="dropdown dropdown-end md:flex gap-2 items-center hidden">
          <label tabIndex={0} className="cursor-pointer">
            <div className="indicator p-3 bg-gray-200 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.2em"
                viewBox="0 0 512 512"
              >
                <path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z" />
              </svg>
            </div>

          </label>
            {/* <span>Message</span> */}
        </div>

        {/* Notification */}
        <div
          onClick={() => {
            handleReadNotification();
            setShowNotificationCard(!showNotificationCard);
          }}
          className="dropdown relative dropdown-end md:flex gap-2 items-center hidden"
        >
          {/*
           **
           ** TOTAL UNREAD NOTIFICATION
           **
           */}
          {/* <sup className="absolute top-[0px] right-[0px] bg-red rounded-full px-2 py-3 bg-red-600 text-white font-bold">
              {showNotification()?.totalUnread?.length > 0
                ? showNotification()?.totalUnread.length
                : 0}
            </sup> */}
          <label tabIndex={0} className="cursor-pointer">
            <div className="indicator p-3 bg-gray-200 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                height="1.5em"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </div>
          </label>
          {/* <span>Notification</span> */}

          {/*
           *
           * NOTIFICATION SHOWING CARD
           *
           */}
          {/* <div
              className={`${
                showNotificationCard
                  ? "absolute top-[60px] right-[-50px] py-4 px-1 border bg-white shadow-md w-[250px] rounded-md h-auto"
                  : "hidden"
              }`}
            >
              {showNotification()?.likeUnread?.length > 0 &&
                showNotification()?.likeUnread?.map((notification, index) => (
                  <p
                    key={index}
                    className="text-[13px] font-semibold cursor-pointer px-6 py-1 rounded-md my-[5px] block text-black bg-blue-50"
                  >
                    <span className="font-semibold pr-1">
                      {notification?.count}
                    </span>
                    people reacted to your post
                  </p>
                ))}
              {showNotification()?.likeRead?.length > 0 &&
                showNotification()?.likeRead?.map((notification, index) => (
                  <p
                    key={index}
                    className="text-[13px] font-semibold cursor-pointer px-6 py-1 rounded-md my-[5px] text-gray-700"
                  >
                    <span className="font-semibold pr-1">
                      {notification?.count}
                    </span>
                    people reacted to your post
                  </p>
                ))}
              {showNotification()?.commentUnread?.length > 0 &&
                showNotification()?.commentUnread.map((notification, index) => (
                  <p
                    key={index}
                    className="text-[13px] font-semibold cursor-pointer px-6 py-1 rounded-md my-[5px] text-black bg-blue-50"
                  >
                    <span className="font-semibold pr-1">
                      {notification?.count}
                    </span>
                    people commented to your post
                  </p>
                ))}
              {showNotification()?.commentUnread?.length > 0 &&
                showNotification()?.commentUnread.map((notification, index) => (
                  <p
                    key={index}
                    className="text-[13px] font-semibold cursor-pointer px-6 py-1 rounded-md my-[5px] text-gray-700"
                  >
                    <span className="font-semibold pr-1">
                      {notification?.count}
                    </span>
                    people commented to your post
                  </p>
                ))}
            </div> */}
        </div>

        {/* Profile */}
        <div className="dropdown relative dropdown-end md:flex gap-2 items-center hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="cursor-pointer relative">
              <Avatar
                onClick={() => setShowLogout(!showLogout)}
                size={48}
                icon={<UserOutlined />}
              />
            </div>
          </label>
          {/* <span>Profile</span> */}

          {/*------------USER CARD (LOGOUT/LOGIN, PROFILE)----------- */}
          <div>
            <Card
              className={`${
                showLogout
                  ? " absolute top-[50px] -left-[60px] w-[120px] h-[100px] shadow"
                  : "hidden"
              } flex flex-col gap-4 border`}
            >
              <Link href="" className="font-semibold mb-2">
                Profile
              </Link>
              {/*--------- LOGOUT TOGGLE------------ */}
              <Button
                onClick={handleLogout}
                className="mt-3 font-semibold border-0 shadow-0"
                block
              >
                Logout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
