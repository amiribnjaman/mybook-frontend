"use client";

import { Inter } from "next/font/google";
import TopNavbar from "@/components/topNavbar";
import LeftSidebar from "@/components/leftSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function LayoutComponent({ children }) {
  const pathname = usePathname();
  const getPath = pathname.split("/")[pathname.split("/").length - 1];
  const [show, setShow] = useState(false);
  
  const route = ["login", "signup"];
  

    setTimeout(() => {
      setShow(true);
    }, 1000);

  return (
    <>
      {show ? (
        <div>
          {route.includes(getPath) ? (
            ""
          ) : (
            <>
              <TopNavbar />
              <LeftSidebar />
            </>
          )}

          <div className="mt-4 w-[95%] relative mx-auto flex gap-6">
            <div className=" w-1/4"></div>
            <ToastContainer position="top-center" />
            {children}
            <div className="w-1/4"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
