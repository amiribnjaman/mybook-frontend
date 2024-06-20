"use client";

import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SERVER_URL } from "@/utilitis/SERVER_URL";
import axios from "axios";

export default function TopNavbar() {
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
      (notification) => notification?.like == true && notification?.read == false
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
        if (res.data.status == '200') {
          setReload(!reload);
        }
      });
  };

  return (
    <div
      id="topbar"
      className="w-full mb-8 sticky relative shadow-md h-[50px] top-0 z-50"
    >
      <div className="navbar flex items-center justify-between bg-white shadow-md px-6 sticky top-0">
        <ul className="flex flex-col gap-3">
          <li className="">
            <Link
              href="/"
              className="text-[32px] font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 from-10% to-emerald-500 to-90%"
            >
              Mybook
            </Link>
          </li>
            </ul>
          </li>
      </div>
    </div>
  );
}
