"use client";

import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Progress, Steps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import axios from "axios";
import MessageInboxCard from "./messageInboxCard";

export default function RightSidebar() {
  const [showLogout, setShowLogout] = useState(false);
  const [showMessageCard, setShowMessageCard] = useState(false);
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
    <div className="sidebar fixed">
      {/*--------------Right side nav menu-------------- */}
      <div className="flex gap-3 ">
        {/* Grid */}
        <div className="dropdown dropdown-end md:flex gap-2 items-center hidden ">
          <label tabIndex={0} className="cursor-pointer">
            <div className="indicator flex gap-[3px] p-3 bg-white rounded-full">
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
        <div
          onClick={() => {
            setShowMessageCard(!showMessageCard);
          }}
          className="dropdown dropdown-end md:flex gap-2 items-center hidden"
        >
          <label tabIndex={0} className="cursor-pointer">
            <div className="indicator p-[14px] bg-white rounded-full">
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
        {showMessageCard && (
          <div className="absolute top-12 shadow left-0 w-full bg-white rounded z-50 p-2 mt-4">
            {" "}
            <MessageInboxCard />
          </div>
        )}

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
            <div className="indicator p-[11px] bg-white rounded-full">
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
          <div
            className={`${
              showNotificationCard
                ? "absolute top-[60px] right-[-50px] py-4 px-1 border bg-white shadow-md w-[250px] rounded-md h-auto z-[50] text-[15px]"
                : "hidden"
            }`}
          >
            {showNotification()?.likeUnread?.length > 0 &&
              showNotification()?.likeUnread?.map((notification, index) => (
                <p
                  key={index}
                  className="text-[15px] font-semibold cursor-pointer px-6 py-1 rounded-md my-[5px] block text-black bg-blue-50"
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
          </div>
        </div>

        {/* Profile */}
        <div className="dropdown relative dropdown-end md:flex gap-2 items-center hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="cursor-pointer relative ">
              <Avatar
                className="bg-white text-slate-600"
                onClick={() => setShowLogout(!showLogout)}
                size={46}
                icon={<UserOutlined />}
              />
            </div>
          </label>
          {/* <span>Profile</span> */}

          {/*------------USER CARD (LOGOUT/LOGIN, PROFILE)----------- */}
          <div className="z-10">
            <Card
              className={`${
                showLogout
                  ? " absolute top-[55px] -left-[170px] w-[220px] h-auto shadow-md border"
                  : "hidden"
              }`}
            >
              <div className="flex flex-col gap-2 text-left text-[16px]">
                <Link
                  href=""
                  className="font-semibold mb-2 flex justify-between items-center"
                >
                  <span>Profile</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                  </svg>
                </Link>
                <Link
                  href=""
                  className="font-semibold mb-2 flex justify-between items-center"
                >
                  <span>Friends</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                  </svg>
                </Link>
                <Link
                  href=""
                  className="font-semibold mb-2 flex justify-between items-center"
                >
                  <span>Pages</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
                  </svg>
                </Link>

                <Link
                  href=""
                  className="font-semibold mb-2 flex justify-between items-center"
                >
                  <span>Groups</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z" />
                  </svg>
                </Link>
                <Link href="" className="font-semibold mb-2">
                  Help & Support
                </Link>
                <Link href="" className="font-semibold mb-2">
                  Settings
                </Link>
                {/*--------- LOGOUT TOGGLE------------ */}
                <Button
                  onClick={handleLogout}
                  className="p-0 font-semibold border-0 shadow-none inline text-left flex flex-start text-[16px] bg-trasparent"
                >
                  Logout
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/*--------------Right Profile Completion Card-------------- */}
      <div className="mt-6 mb-4 px-2 py-3 rounded  bg-white shadow">
        <h3 className="text-[16px] font-semibold">Complete your Profile</h3>
        <div className="mt-4 text-center">
          <Progress
            type="dashboard"
            percent={70}
            gapDegree={100}
            strokeColor={{ from: "#20BD5A", to: "#20BD5A" }}
            size={[200, 10]}
          />
          <div className="flex">
            <span className="w-[2px] h-[100px] bg-slate-300 inline-block mt-[14px] ml-[10px]"></span>
            <div className="p-1 flex flex-col gap-3 mt-2 text-sm ml-[-13px] w-full">
              <div className="flex justify-between w-full">
                <h5 className="flex gap-2 items-center">
                  <span className="bg-white w-4 h-4 rounded-full border border-slate-400 inline-block"></span>
                  General Information
                </h5>
                <h6 className="text-slate-800">4/6</h6>
              </div>
              <div className="flex justify-between">
                <h5 className="flex gap-2 items-center">
                  <span className="bg-white w-4 h-4 rounded-full border border-slate-400 inline-block"></span>
                  Work Experience
                </h5>
                <h6 className="text-slate-800">1/3</h6>
              </div>
              <div className="flex justify-between">
                <h5 className="flex gap-2 items-center">
                  <span className="bg-[#53cf9b] w-4 h-4 rounded-full inline-block text-[10px] flex items-center justify-center font-semibold text-white">
                    &#10003;
                  </span>
                  Profile Photo
                </h5>
                <h6 className="text-[#53cf9b]">1/1</h6>
              </div>
              <div className="flex justify-between">
                <h5 className="flex gap-2 items-center">
                  <span className="bg-[#53cf9b] w-4 h-4 rounded-full inline-block text-[10px] flex items-center justify-center font-semibold text-white">
                    &#10003;
                  </span>
                  Cover Photo
                </h5>
                <h6 className="text-[#53cf9b]">1/1</h6>
              </div>
              {/* <Steps
              style={{ color: "#20BA59" }}
              direction="vertical"
              current={2}
              size={20}
              customIconFontSize={10}
              customIconSize={5}
              iconSize={10}
              items={[
                {
                  title: "General Information",
                },
                {
                  title: "Work Experience",
                },
                {
                  title: "Profile Photo",
                },
                {
                  title: "Cover Photo",
                },
              ]}
            /> */}
            </div>
          </div>
          <button className="text-white rounded-md px-3 py-1.5 mt-7 bg-gradient-to-l from-green-700 to-green-500 w-full">
            Complete Now
          </button>
        </div>
      </div>

      {/*----------------------BOTTOM COMPANY ABOUT SECTION--------*/}
      <ul className="flex flex-row text-[13px] gap-3 mt-1 font-semibold">
        <li>
          <Link href="">About</Link>
        </li>
        <li>
          <Link href="">Privacy policy</Link>
        </li>
        <li>
          <Link href="">Contact info</Link>
        </li>
      </ul>
    </div>
  );
}
