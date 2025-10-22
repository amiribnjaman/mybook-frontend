'use client'

import React, { useState } from "react";

export default function ChatCard({ showChatCard, setShowChatCard }) {
  const [msgCard, setMsgCard] = useState(false)
  return (
    <div className="relative w-[400px] h-[480px] bg-white shadow-lg rounded-lg p-4">
      <div>
        {/* TOP HEAIDNG */}
        <div className="flex justify-between relative">
          <h4 className="text-[24px]">Messages</h4>
          {/* Card cancle button */}
          <button
            className="w-[36px] h-[36px] bg-[#f9f9f9] rounded-md flex justify-center items-center border border-[#f6f6f6] hover:border-[#eee] transition text-center"
            onClick={() => setShowChatCard(!showChatCard)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="rotate-45 text-center pl-[2px] text-[#]"
            >
              <path fill="currentColor" d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z" />
            </svg>
          </button>
        </div>

        {/* CHAT USER LIST */}
        <div className="mt-8 flex flex-col gap-4">
          {/* SINGLE USER */}
          <div
            onClick={() => setMsgCard(!msgCard)}
            className="flex justify-between items-center gap-4 w-full bg-[#f9f9f9] py-2 px-2.5 rounded cursor-pointer"
          >
            <div className="flex gap-4">
              {/* USER IMAGE */}
              <div className="w-[44px] h-[44px] rounded-full bg-[#eee]"></div>
              <div>
                <h3>Abdul Hannan</h3>
                <h4 className="text-sm text-slate-700">Following</h4>
              </div>
            </div>
            <button className="w-[100px] h-[42px] bg-[#00CFFF] flex items-center justify-center text-white text-[15px] rounded cursor-pointer">
              Message
            </button>
          </div>
        </div>
      </div>

      {/* MESSAGE BODY FOR INDIVIDUAL USER  */}
      <div
        className={`${
          msgCard
            ? "w-full h-full z-[100] bg-white absolute top-0 left-0 rounded-lg px-4 py-6"
            : "hidden"
        } `}
      >
        {/* HEADING/USER INFO */}
        <div className="flex justify-between">
          <button
            onClick={() => setMsgCard(!msgCard)}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 21 21"
              className="text-dark rotate-[-90deg]"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.5 7.5l-4-4l-4.029 4m4.029-4v13"
                stroke-width="1"
              />
            </svg>
          </button>

          <div>
            <h2 className="text-[18px]">Abdul Hanna</h2>
          </div>
          <div></div>
        </div>

        {/* MAIN MESSAGE AREA */}
        <div>
          <div></div>

          {/* SEND BUTTON */}
          <div className="flex gap-2 items-center absolute bottom-4 left-3 right-3">
            <input
              className="rounded-[8px] pl-[16px] py-2.5 block w-full focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF] border border-[#00CFFF] text-black placeholder:font-light outline-none resize-none pr-[54px]"
              type="text"
              placeholder='Your message..'
            />
            <button className="w-[100px] bg-[#00CFFF] flex items-center justify-center text-white text-[15px] rounded-[8px] border border-[#00CFFF] cursor-pointer py-2.5">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
