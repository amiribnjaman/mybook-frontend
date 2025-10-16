import { UserOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import SkeletonImage from "antd/es/skeleton/Image";

export default function FeedSkeleton() {
  return (
    <>
      <div className="flex w-[95%] h-[60vh] mx-auto gap-10">
        {/* =============================LEFT NAVABR ============ */}
        <div
          style={{ width: "27%" }}
          className="mt-6 md:block hidden max-w-[27%] ml-[3%] mb-3 px-6 relative py-3 rounded-lg shadow bg-gradient-to-br to-[#0f2027] from-[#203a43] shadow-lg border border-[#2c5364]"
        >
          {/*----------------POST HEADEING------------*/}
          <div className="flex justify-between px-4">
            <div className="flex flex-col gap-3 post-user">
              <Skeleton.Input
                size={30}
                className="w-full mt-[4px]"
                block
                active
              />
              <Skeleton.Input
                size={30}
                className="w-full mt-[4px]"
                width={700}
                block
                active
              />
              <Skeleton.Input
                size={30}
                className="w-full mt-[4px]"
                width={700}
                block
                active
              />
              <Skeleton.Input
                size={30}
                className="w-full mt-[4px]"
                width={700}
                block
                active
              />
            </div>
            <div></div>
          </div>
        </div>
        {/*================================NEWS FEED========================*/}
        <div className="mt-6 w-[95%] md:w-[70%] mx-auto md:mx-0 md:ml-auto mb-3 relative py-3 px-6 rounded-lg bg-gradient-to-br to-[#0f2027] from-[#203a43] shadow-lg border border-[#2c5364] mr-[2%]">
          {/*----------------POST HEADEING------------*/}
          <div className="flex justify-between px-4">
            <div className="flex gap-3 post-user">
              <Skeleton.Avatar size={50} active />
              <Skeleton.Input
                size={30}
                className="w-full mt-[4px]"
                width={400}
                block
                active
              />
            </div>
            <div></div>
          </div>

          {/*----------------POST CONTENT----------- */}
          <div className="mt-8 mb-4">
            <div className="mb-4 px-2 md:px-4 mt-10 md:flex gap-4">
              <Skeleton paragraph size={60} active />

              <div className="hidden md:block flex w-full">
                <SkeletonImage active />
              </div>
              <div className="block md:hidden w-[200px]">
                <SkeletonImage className='md:hidden mobile-skeletop-img' active />
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <div className="md:block hidden mt-2 w-[200px]">
            <div className="flex gap-[10px] pt-3 pb-1 px-3 gap-4 skeleton-group">
              <Skeleton.Input className="w-full mt-[4px]" block active />
              <Skeleton.Input className=" mt-[4px]" block active />
              <Skeleton.Input className="w-full mt-[4px]" block active />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
