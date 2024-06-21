import Link from "next/link";

export default function leftSidebar() {
  return (
    <div className="fixed w-[240px]">
      <div className="flex flex-col ">
        <ul className="flex flex-col gap-3">
          <li className="">
            <Link
              href="/"
              className="text-[32px] font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 from-10% to-emerald-500 to-90%"
            >
              Mybook
            </Link>
          </li>
          <li className="w-[240px] bg-white">
            {/*------------Search Card------------*/}
            <input
              type="text"
              className="rounded-full w-[240px] text-gray-500 rounded-full px-4 py-1.5"
              placeholder="Search Mybook"
            />
          </li>

          {/*----------------Subscribe to premium-----------*/}
          <div className="w-[240px] mt-3 p-2 rounded bg-white">
            <h3 className="font-semibold text-[20px]">Subscribe to Premium</h3>
            <p className="text-[15px]">
              Subscribe to unlock new features and if eligible, receive a share
              of ads revenue.
            </p>
            <button className="text-white rounded-md px-3 py-1 mt-2 bg-gradient-to-l from-green-700 to-green-500">
              Subscribe
            </button>
          </div>
        </ul>

        {/*------------------Latest news/Article--------- */}
        {/* <div className="border rounded p-3 mt-3 gap-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-[17px]">Lates News/Article</h3>
            <Link href="" className="text-[14px] font-semibold underline">
              More
            </Link>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-[40px] h-[25px] bg-slate-200 rounded"></div>
            <h6 className="text-sm hover:underline cursor-pointer font-semibold">
              Lorem ipsum dolor sit..
            </h6>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-[40px] h-[25px] bg-slate-200 rounded"></div>
            <h6 className="text-sm hover:underline cursor-pointer font-semibold">
              Lorem ipsum dolor sit..
            </h6>
          </div>
        </div> */}

        {/*------------------Follow--------- */}
        <div className=" rounded p-3 mt-3 mb-3 bg-white ">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[17px]">You may follow</h3>
            <Link href="" className="text-[14px] font-semibold underline">
              More
            </Link>
          </div>

          <div className="flex items-center justify-between gap-2 mb-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-[32px] h-[32px] bg-slate-200 rounded-full"></div>
              <h6 className="text-[16px] hover:underline cursor-pointer">
                Steve Smith
              </h6>
            </div>
            <div className="cursor-pointer text-[14px] font-semibold">
              follow
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mb-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-[32px] h-[32px] bg-slate-200 rounded-full"></div>
              <h6 className="text-[16px] hover:underline cursor-pointer">
                Gerard Hasi
              </h6>
            </div>
            <div className="cursor-pointer text-[14px] font-semibold">
              follow
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mb-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-[32px] h-[32px] bg-slate-200 rounded-full"></div>
              <h6 className="text-[16px] hover:underline cursor-pointer">
                Yaqub Adnain
              </h6>
            </div>
            <div className="cursor-pointer text-[14px] font-semibold">
              follow
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mb-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-[32px] h-[32px] bg-slate-200 rounded-full"></div>
              <h6 className="text-[16px] hover:underline cursor-pointer">
                Bret Leon
              </h6>
            </div>
            <div className="cursor-pointer text-[14px] font-semibold">
              follow
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mb-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-[32px] h-[32px] bg-slate-200 rounded-full"></div>
              <h6 className="text-[16px] hover:underline cursor-pointer">
                Mickel Jordan
              </h6>
            </div>
            <div className="cursor-pointer text-[14px] font-semibold">
              follow
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mb-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-[32px] h-[32px] bg-slate-200 rounded-full"></div>
              <h6 className="text-[16px] hover:underline cursor-pointer">
                Alex Tez
              </h6>
            </div>
            <div className="cursor-pointer text-[14px] font-semibold">
              follow
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}