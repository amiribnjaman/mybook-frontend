import { UserOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import SkeletonImage from "antd/es/skeleton/Image";

export default function FeedSkeleton() {
  return (
    <>

      <div className="flex w-[95%] mx-auto min-h-[1000px]">
      {/* =============================LEFT NAVABR ============ */}
        <div style={{width:'27%'}} className="mt-6 max-w-[27%] ml-[3%] mb-3 relative py-3 rounded-md border shadow bg-white h-[900px]">
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
        <div className="mt-6 w-[70%] ml-auto mb-3 relative py-3 rounded-md border shadow bg-white mr-[2%] h-[900px]">
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
            <div className="mb-4 px-4 mt-10 flex gap-3">
              <Skeleton paragraph size={60} rows={1} active />
              <SkeletonImage size={35} active />
            </div>
          </div>
          <hr />
          <div className="mt-2">
            <div className="flex gap-[20px] pt-3 pb-1 px-3 gap-4 skeleton-group">
              <Skeleton.Input
                size={15}
                className="w-full mt-[4px]"
                block
                active
              />
              <Skeleton.Input size={15} className=" mt-[4px]" block active />
              <Skeleton.Input
                size={15}
                className="w-full mt-[4px]"
                block
                active
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
