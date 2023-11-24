"use client";

import { Inter } from "next/font/google";
import TopNavbar from "@/components/topNavbar";
import LeftSidebar from "@/components/leftSidebar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function LayoutComponent({ children }) {
  const pathname = usePathname();
  const getPath = pathname.split("/")[pathname.split("/").length - 1];

  const route = ["login", "signup"];

  return (
    <>
      {route.includes(getPath) ? (
        ""
      ) : (
        <>
          <TopNavbar />
          <LeftSidebar />
        </>
      )}

      <div className="mt-4 w-[95%]  mx-auto flex gap-6">
        <div className=" w-1/4"></div>
        {children}
        <div className="w-1/4"></div>
      </div>
    </>
  );
}
