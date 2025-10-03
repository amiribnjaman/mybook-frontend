'use client';

import { Exo_2 } from "next/font/google";
import Link from "next/link";
import React from "react";

const exo = Exo_2({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function TopNav() {
    
  return (
    <div>
      {/* Top message */}
      <div className="flex items-center justify-center text-center pt-4">
        <h6 className="text-white font-light text-sm flex items-center gap-2">
          <span>Stop genocide on Gaza. Free Palestine</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 64 64"
          >
            <path fill="#e6e7e8" d="M1 25h63v14H1z" />
            <path
              fill="#ec1c24"
              d="M32.416 32L4.486 11.5C1.513 13.407 0 16.942 0 21v22c0 3.883 1.385 7.289 4.11 9.246l28.344-20.219z"
            />
            <path
              fill="#137a08"
              d="M22.68 39L4.121 52.238C5.656 53.345 7.609 54 10 54h44c6.627 0 10-4.925 10-11v-4z"
            />
            <path
              fill="#25333a"
              d="M54 10H10c-2.201 0-4.03.553-5.514 1.5L22.879 25h41.12v-4c0-6.075-3.373-11-10-11"
            />
          </svg>
        </h6>
      </div>
      <div className="w-[95%] mx-auto pb-8 pt-6 flex gap-12 items-center justify-between">
        {/* LOGO */}
        <div className="text-white font-bold text-lg">
          <Link href="/" className="flex items-center gap-[8px]">
            <img className="" src="/img/logo.png" alt="logo" />

            <h1
              className={`${exo.className} text-[30px] text-[#00CFFF] font-semibold`}
            >
              K'nect
              {/* 00A400 */}
            </h1>
          </Link>
        </div>

        {/* Search */}
        <div className=" flex gap-3">
          <div className="relative flex items-center gap-3 w-[340px] h-[40px] bg-[#F4F4F9] rounded-full px-4 focus:border-[#00CFFF] focus:ring-1 focus:ring-[#00CFFF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="asbolute z-10 text-[#666A71]"
            >
              <path
                fill="currentColor"
                d="M20.031 20.79c.46.46 1.17-.25.71-.7l-3.75-3.76a7.9 7.9 0 0 0 2.04-5.31c0-4.39-3.57-7.96-7.96-7.96s-7.96 3.57-7.96 7.96s3.57 7.96 7.96 7.96c1.98 0 3.81-.73 5.21-1.94zM4.11 11.02c0-3.84 3.13-6.96 6.96-6.96c3.84 0 6.96 3.12 6.96 6.96s-3.12 6.96-6.96 6.96c-3.83 0-6.96-3.12-6.96-6.96"
              />
            </svg>
            <input
              className="w-[340px] h-[40px] bg-[#F4F4F9] rounded-full pl-1 pr-4 text-dark placeholder:text-[#666A71] placeholder:font-regular  outline-none"
              type="text"
              placeholder="Search here.."
            />
          </div>

          {/* Create button */}
          <div className="w-[120px] h-[40px] bg-[#00CFFF] rounded-full text-white text-center flex gap-1 items-center justify-center cursor-pointer hover:opacity-90 transition">
            <span>Create</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z" />
            </svg>
          </div>
        </div>

        {/* USER OPTIONS */}
        <div className="flex gap-[28px] items-center justify-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-white cursor-pointer hover:opacity-90 transition"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M15.5 18a3.5 3.5 0 1 1-7 0m10.731 0H4.77a1.769 1.769 0 0 1-1.25-3.02l.602-.603A3 3 0 0 0 5 12.256V9.5a7 7 0 0 1 14 0v2.756a3 3 0 0 0 .879 2.121l.603.603a1.77 1.77 0 0 1-1.25 3.02"
            />
          </svg>
          <svg
            className="text-white cursor-pointer hover:opacity-90 transition"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m3 20l1.3-3.9C1.976 12.663 2.874 8.228 6.4 5.726c3.526-2.501 8.59-2.296 11.845.48c3.255 2.777 3.695 7.266 1.029 10.501S11.659 20.922 7.7 19z"
            />
          </svg>

          <div className="w-[152px] h-[40px] bg-white rounded-full flex items-center justify-center gap-2">
            <div className="w-[36px] h-[36px] bg-[#f1f1f1] rounded-full"></div>
            <h1>Ameer H.</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="22"
              viewBox="0 0 12 24"
              className="rotate-[90deg]"
            >
              <defs>
                <path
                  id="SVG1pzpbdYY"
                  fill="currentColor"
                  d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"
                />
              </defs>
              <use
                fill-rule="evenodd"
                href="#SVG1pzpbdYY"
                transform="rotate(-180 5.02 9.505)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
