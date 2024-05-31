import Link from "next/link";

export default function leftSidebar() {
  return (
    <div className="fixed w-[240px]">
      <div className="flex flex-col ">
        <ul className="flex flex-col gap-3">
          <li className="">
            <Link
              href=""
              className="text-[30px] font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 from-10% to-emerald-500 to-90%"
            >
              Mybook
            </Link>
          </li>
          <li className="w-[240px]">
            {/*------------Search Card------------*/}
            <input
              type="text"
              className="bg-slate-100 w-[240px] text-gray-500 rounded-full px-4 py-1.5"
              placeholder="Search Mybook"
            />
          </li>

          {/*----------------Subscribe to premium-----------*/}
          <div className="w-[240px] mt-3 border p-2 rounded">
            <h3 className="font-semibold text-[20px]">Subscribe to Premium</h3>
            <p className="text-sm">
              Subscribe to unlock new features and if eligible, receive a share
              of ads revenue.
            </p>
            <button className="text-white rounded-md px-3 py-1 mt-2 bg-gradient-to-l from-green-700 to-green-500">
              Subscribe
            </button>
          </div>
        </ul>

        {/*------------------Latest news/Article--------- */}
        <div className="border rounded p-3 mt-3 ">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[16px] mb-1">
              Lates News/Article
            </h3>
            <Link href="" className="text-[13px] font-semibold underline">
              More
            </Link>
          </div>

          <div className="flex items-center gap-1 mb-1">
            <div className="w-[35px] h-[20px] bg-slate-200 rounded"></div>
            <h6 className="text-sm hover:underline cursor-pointer font-semibold">
              Lorem ipsum dolor sit..
            </h6>
          </div>
          <div className="flex items-center gap-1 mb-1">
            <div className="w-[35px] h-[20px] bg-slate-200 rounded"></div>
            <h6 className="text-sm hover:underline cursor-pointer font-semibold">
              Lorem ipsum dolor sit..
            </h6>
          </div>
        </div>

        {/*------------------Follow--------- */}
        <div className="border rounded p-3 mt-3 mb-3 ">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[16px] mb-1">You may follow</h3>
            <Link href="" className="text-[13px] font-semibold underline">
              More
            </Link>
          </div>

          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1">
              <div className="w-[35px] h-[35px] bg-slate-200 rounded-full"></div>
              <h6 className="text-sm hover:underline cursor-pointer">
                Steve Smith
              </h6>
            </div>
            <div className="cursor-pointer text-sm font-semibold">follow</div>
          </div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1">
              <div className="w-[35px] h-[35px] bg-slate-200 rounded-full"></div>
              <h6 className="text-sm hover:underline cursor-pointer">
                Gerard Hasi
              </h6>
            </div>
            <div className="cursor-pointer text-sm font-semibold">follow</div>
          </div>
        </div>

        <ul className="flex flex-row text-[13px] gap-3 mt-3 font-semibold">
          <li>
            <Link href="">About</Link>
          </li>
          <li>
            <Link href="">Privacy policy</Link>
          </li>
          <li>
            <Link href="">Contact info</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}