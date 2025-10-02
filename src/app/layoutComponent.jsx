"use client";

import { Poppins } from "next/font/google";
import TopNavbar from "@/components/topNavbar";
import LeftSidebar from "@/components/leftSidebar";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import RightSidebar from "@/components/rightSidebar";
import { CookiesProvider } from "react-cookie";

const poppins = Poppins({
  weight:['100','200', '300','400','500','600','700', '800','900'],
  subsets: ["latin"] });



export default function LayoutComponent({ children }) {
  const pathname = usePathname();
  const getPath = pathname.split("/")[pathname.split("/").length - 1];

  const route = ["login", "signup", "forgot"];
  // Check if LOGIN/SIGNUP PATH MATCHED OR NOT
  const authPath = route.includes(getPath);

  return (
    <div
      className={`${poppins.className} bg-gradient-to-b from-[#2c5364] via-[#203a43] to-[#0f2027] min-h-screen`}
    >
      <CookiesProvider>
        <div
          className={`${!authPath} && md:mx-auto flex flex-col md:flex-row md:gap-6 gap-2`}
        >
          {/* {!authPath && (
            <div className="md:w-[20%] hidden lg:block">
              <>
                {/* <TopNavbar /> 
                <LeftSidebar />
              </>
            </div>
          )} */}
          <ToastContainer position="top-center" />
          {/* {!authPath && (
            <div className="fixed lg:hidden w-full md:w-[90%] z-[100]">
              <TopNavbar />
            </div>
          )} */}

          <div className="w-full">{children}</div>
          {/* {!authPath && (
            <div className="md:w-[20%] hidden lg:block">
              <RightSidebar />
            </div>
          )} */}
        </div>
      </CookiesProvider>
    </div>
  );
}
