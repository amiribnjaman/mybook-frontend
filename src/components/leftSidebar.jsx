import Link from "next/link";

export default function leftSidebar() {
  return (
    <div className="fixed ">
        <ul className="flex flex-col gap-3">
          <li className="">
            <Link
              href=""
              className="text-[30px] font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 from-10% to-emerald-500 to-90%"
            >
              Mybook
            </Link>
          </li>
          <li className="">
            {/*------------Search Card------------*/}
            <input
              type="text"
              className="bg-slate-100 w-[95%] text-gray-500 rounded-full px-4 py-1.5"
              placeholder="Search Mybook"
            />
          </li>

          {/*----------------Subscribe to premium-----------*/}
          <div className='w-[220px] my-3 border p-2 rounded'>
            <h3 className='font-semibold text-[20px]'>Subscribe to Premium</h3>
            <p className='text-sm'>
              Subscribe to unlock new features and if eligible, receive a share
              of ads revenue.
            </p>
            <button></button>
          </div>
        </ul>
      </div>
  );
}