import { UserOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import SkeletonImage from "antd/es/skeleton/Image";

export default function FeedSkeleton() {
  return (
    <>
      {/*======================= CREATE POST SECTION================ */}
      <div
        className={`"backdrop-blur-md" : ""
        } bg-white w-[90%] mr-auto px-2 py-2 shadow border rounded-md`}
      >
        <div className="mx-3 flex gap-3 mb-3 post-create">
          <Skeleton.Avatar size={50} active />
          <Skeleton.Input size={35} className="w-full mt-[6px]" block active />
        </div>
        <hr />
        {/*------------- POST TYPES---------- */}
        <div className="flex justify-between py-2 px-3 gap-4 skeleton-group">
          <Skeleton.Input size={15} className="w-full mt-[4px]" block active />
          <Skeleton.Input size={15} className=" mt-[4px]" block active />
          <Skeleton.Input size={15} className="w-full mt-[4px]" block active />
        </div>
      </div>

      {/*================================NEWS FEED========================*/}
      <div className="mt-6 w-[90%] mb-3 relative py-3 mr-auto rounded-md border shadow bg-white">
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
          <div className="mb-4 px-4 mt-10 flex flex-col gap-3">
            <Skeleton paragraph size={30} rows={1} active />
            <SkeletonImage size={100} active />
          </div>
        </div>
        <hr />
        <div className="mt-2">
          <div className="flex justify-between pt-3 pb-1 px-3 gap-4 skeleton-group">
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
    </>
  );
}
