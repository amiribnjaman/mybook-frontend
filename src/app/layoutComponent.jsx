"use client";

import { Inter } from "next/font/google";
import TopNavbar from "@/components/topNavbar";
import LeftSidebar from "@/components/leftSidebar";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import RightSidebar from "@/components/rightSidebar";
import { CookiesProvider } from 'react-cookie';

const inter = Inter({ subsets: ["latin"] });

export default function LayoutComponent({ children }) {
  const pathname = usePathname();
  const getPath = pathname.split("/")[pathname.split("/").length - 1];


  const route = ["login", "signup", "forgot"];
  // Check if LOGIN/SIGNUP PATH MATCHED OR NOT
  const authPath = route.includes(getPath);

  return (
    <div className="">
      <CookiesProvider>
        <div className="mt-4 w-[85%] mx-auto flex gap-6">
          <div className=" w-[22%]">
            {!authPath && (
              <>
                {/* <TopNavbar /> */}
                <LeftSidebar />
              </>
            )}
          </div>
          <ToastContainer position="top-center" />
          <div className="w-[55%]">{children}</div>
          <div className="w-[22%]"> {!authPath && <RightSidebar />} </div>
        </div>
      </CookiesProvider>
    </div>
  );
}
