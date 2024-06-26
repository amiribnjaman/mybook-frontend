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
    <div className={`${!authPath && "bg-[#F0F2F5]"}`}>
      <CookiesProvider>
        <div className="md:pt-4 md:w-[85%] md:mx-auto flex flex-col md:flex-row md:gap-6 gap-2">
          <div className="md:w-[20%] hidden lg:block">
            {!authPath && (
              <>
                {/* <TopNavbar /> */}
                <LeftSidebar />
              </>
            )}
          </div>
          <ToastContainer position="top-center" />
          {!authPath && (
            <div className="fixed lg:hidden w-full md:w-[90%] z-[100]">
              <TopNavbar />
            </div>
          )}

          <div className="lg:w-[60%] w-full">{children}</div>
          <div className="md:w-[20%] hidden lg:block">
            {!authPath && <RightSidebar />}{" "}
          </div>
        </div>
      </CookiesProvider>
    </div>
  );
}
