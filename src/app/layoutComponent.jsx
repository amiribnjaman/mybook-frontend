'use client'

import { Inter } from "next/font/google";
import TopNavbar from "@/components/topNavbar";
import LeftSidebar from "@/components/leftSidebar";
import { usePathname } from "next/navigation";
import React, {useEffect, useState} from "react";

const inter = Inter({ subsets: ["latin"] });

export default function LayoutComponent({ children }) {
  const pathname = usePathname();
  const getPath = pathname.split("/")[pathname.split("/").length - 1];
    console.log(getPath)
    let [show, setShow] = useState(false)

    useEffect(() => {
        if (getPath != "signup" || getPath != "login") {
          setShow(!show);
        }
    }, [])

      return (
        <>
          {show && (
            <>
              <TopNavbar />
              <LeftSidebar />
            </>
          )}
          {/* {getPath != "signup" ? (
            <>
              <TopNavbar />
              <LeftSidebar />
            </>
          ) : getPath != "login" ? (
            <>
              <TopNavbar />
              <LeftSidebar />
            </>
          ) : (
            ""
          )} */}
          <div className="mt-4 w-[95%]  mx-auto flex gap-6">
            <div className=" w-1/4"></div>
            {children}
            <div className="w-1/4"></div>
          </div>
        </>
      );
}
