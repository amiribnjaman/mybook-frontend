import Link from "next/link";

export default function leftSidebar() {
  return (
    <div className="mb-8 col-span-3 min-h-screen md:w-[28%] hidden shadow md:fixed md:block flex-start bg-gradient-to-b from-[#2c5364] via-[#203a43] to-[#0f2027] pt-[24px]">
      <div className="sticky self-start top-[40px] left-0 h-screen w-[70%] ml-[6%]">
        <ul>
          <li className="flex gap-4 items-center mb-4 text-[#f4f4f9] font-regular cursor-pointer bg-[#203A43] w-[100%] h-[44px] rounded-[8px] border border-[#203A43] hover:border-[#2c5364] transition px-[20px] py-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.5 10a.5.5 0 0 0-1 0zm-14 0a.5.5 0 0 0-1 0zm15.146 2.354a.5.5 0 0 0 .708-.708zM12 3l.354-.354a.5.5 0 0 0-.708 0zm-9.354 8.646a.5.5 0 0 0 .708.708zM7 21.5h10v-1H7zM19.5 19v-9h-1v9zm-14 0v-9h-1v9zm15.854-7.354l-9-9l-.708.708l9 9zm-9.708-9l-9 9l.708.708l9-9zM17 21.5a2.5 2.5 0 0 0 2.5-2.5h-1a1.5 1.5 0 0 1-1.5 1.5zm-10-1A1.5 1.5 0 0 1 5.5 19h-1A2.5 2.5 0 0 0 7 21.5z"
              />
            </svg>
            <span className="text-[15px] font-light">Home</span>
          </li>
          <li className="flex gap-4 items-center mb-4 text-[#f4f4f9] font-regular border border-[#203A43] hover:border-[#2c5364] cursor-pointer bg-[#203A43] w-[100%] h-[44px] rounded-[8px] transition px-[20px] py-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 640 512"
              className=""
            >
              <path
                fill="None"
                d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32S80 82.1 80 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2M480 256c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96m48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4c24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48c0-61.9-50.1-112-112-112"
                stroke-width="36"
                stroke="#fff"
              />
            </svg>
            <span className="text-[15px] font-light">Followers</span>
          </li>

          <li className="flex gap-4 items-center mb-4 text-[#f4f4f9] font-regular border border-[#203A43] hover:border-[#2c5364] cursor-pointer bg-[#203A43] w-[100%] h-[44px] rounded-[8px]  transition px-[20px] py-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M12 12c1.873 0 3.57.62 4.815 1.487c1.183.825 2.185 2.051 2.185 3.37c0 .724-.309 1.324-.796 1.77c-.458.421-1.056.694-1.672.88C15.301 19.88 13.68 20 12 20s-3.301-.12-4.532-.493c-.616-.186-1.214-.459-1.673-.88C5.31 18.182 5 17.582 5 16.858c0-1.319 1.002-2.545 2.185-3.37C8.43 12.62 10.127 12 12 12m0 2c-1.44 0-2.743.48-3.67 1.127c-.989.69-1.33 1.392-1.33 1.73c0 .304.352.494.672.614l.205.07l.17.052c.94.284 2.32.407 3.953.407c1.508 0 2.799-.105 3.728-.344l.304-.087l.19-.06c.343-.117.778-.314.778-.652s-.341-1.04-1.33-1.73C14.744 14.481 13.44 14 12 14m7-1c1.044 0 1.992.345 2.693.833c.64.447 1.307 1.19 1.307 2.096c0 1.335-1.297 1.813-2.463 1.98l-.3.037l-.289.025l-.138.008c.122-.345.19-.72.19-1.122a3.8 3.8 0 0 0-.107-.888c.386-.03.703-.08.939-.151c.104-.032.01-.13-.1-.215l-.107-.078l-.076-.051a2.7 2.7 0 0 0-.995-.418c-.38-.76-.964-1.418-1.586-1.943A4.8 4.8 0 0 1 19 13M5 13q.537.002 1.032.113c-.622.525-1.206 1.183-1.586 1.943a2.7 2.7 0 0 0-.995.418l-.128.088c-.127.092-.276.22-.155.256c.236.071.553.122.94.151a3.7 3.7 0 0 0-.108.888c0 .402.068.777.19 1.122l-.28-.02l-.296-.03c-1.202-.147-2.614-.607-2.614-2c0-.905.666-1.649 1.307-2.096A4.76 4.76 0 0 1 5 13m13.5-6a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m-13 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5M12 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8m6.5 6a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1m-13 0a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1M12 5a2 2 0 1 0 0 4a2 2 0 0 0 0-4"
                />
              </g>
            </svg>
            <span className="text-[15px] font-light">Groups</span>
          </li>
        </ul>

        {/* Categories list*/}
        <ul className="mt-[40px]">
          <h5 className="text-[14px] font-light text-white mb-[6px]">
            Categories:
          </h5>
          <li className="flex gap-4 items-center mb-4 text-[#f4f4f9] font-regular cursor-pointer bg-[#203A43] border border-[#203A43] hover:border-[#2c5364] w-[100%] h-[44px] rounded-[8px]  transition px-[20px] py-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M2 4.5A1.5 1.5 0 0 1 3.5 3h13A1.5 1.5 0 0 1 18 4.5v4a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 8.5zM3.5 4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5zM2 13.5A1.5 1.5 0 0 1 3.5 12h4A1.5 1.5 0 0 1 9 13.5v2A1.5 1.5 0 0 1 7.5 17h-4A1.5 1.5 0 0 1 2 15.5zm1.5-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5zm9-1a1.5 1.5 0 0 0-1.5 1.5v2a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-2a1.5 1.5 0 0 0-1.5-1.5zm-.5 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            <span className="text-[15px] font-light">News</span>
          </li>
          <li className="flex gap-4 items-center mb-4 text-[#f4f4f9] font-regular border border-[#203A43] hover:border-[#2c5364] cursor-pointer bg-[#203A43] w-[100%] h-[44px] rounded-[8px]  transition px-[20px] py-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.5 16.5h6v-1h-6zm0-4h9v-1h-9zm0-4h9v-1h-9zM5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1h12.769q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192M5 5v14z"
              />
            </svg>
            <span className="text-[15px] font-light">Articles</span>
          </li>

          <li className="flex gap-4 items-center mb-4 text-[#f4f4f9] font-regular cursor-pointer border border-[#203A43] hover:border-[#2c5364] bg-[#203A43] w-[100%] h-[44px] rounded-[8px]  transition px-[20px] py-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M4.353 4.334a.476.476 0 0 1 .673.01a.53.53 0 0 1-.011.742A6.98 6.98 0 0 0 3 10c0 1.99.83 3.786 2.164 5.06a.53.53 0 0 1 .023.753a.475.475 0 0 1-.662.02A7.98 7.98 0 0 1 2 10c0-2.214.9-4.218 2.353-5.666m10.632.752a.53.53 0 0 1-.01-.742a.476.476 0 0 1 .672-.01A7.98 7.98 0 0 1 18 10c0 2.3-.97 4.374-2.525 5.833a.475.475 0 0 1-.662-.02a.53.53 0 0 1 .023-.752A6.98 6.98 0 0 0 17 10a6.98 6.98 0 0 0-2.015-4.915M6.132 6.09a.464.464 0 0 1 .656.016c.208.208.187.55-.018.76A4.5 4.5 0 0 0 5.5 10c0 1.29.543 2.454 1.414 3.275c.22.207.25.561.035.776a.463.463 0 0 1-.638.028A5.5 5.5 0 0 1 4.5 10a5.48 5.48 0 0 1 1.632-3.91m7.098.776c-.205-.21-.226-.552-.018-.76a.464.464 0 0 1 .656-.016A5.48 5.48 0 0 1 15.5 10a5.5 5.5 0 0 1-1.81 4.08a.463.463 0 0 1-.64-.03c-.214-.214-.184-.568.036-.775A4.5 4.5 0 0 0 14.5 10a4.5 4.5 0 0 0-1.27-3.134M10 8.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5"
              />
            </svg>
            <span className="text-[15px] font-light">Lives</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
