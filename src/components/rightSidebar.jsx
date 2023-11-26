export default function RightSidebar() {
  return (
    <div className="sidebar ml-16 overflow-y-auto w-1/4 fixed">
      <div className="">
        <ul className="flex flex-col gap-3">
          <li className="">
            {/* <RssFeed className="sidebarIcon" /> */}
            <span className="font-semibold">User</span>
          </li>
          <li className="">
            {/* <RssFeed className="sidebarIcon" /> */}
            <span className="font-semibold">Friends</span>
          </li>
          <li className="">
            {/* <Chat className="sidebarIcon" /> */}
            <span className="font-semibold">Saved</span>
          </li>
          <li className="">
            {/* <PlayCircleFilledOutlined className="sidebarIcon" /> */}
            <span className="font-semibold">Memories</span>
          </li>
          <li className="">
            {/* <Group className="sidebarIcon" /> */}
            <span className="font-semibold">Groups</span>
          </li>
          <li className="sidebarListItem">
            {/* <Bookmark className="sidebarIcon" /> */}
            <span className="font-semibold">Groups</span>
          </li>
          <li className="">
            {/* <HelpOutline className="sidebarIcon" /> */}
            <span className="font-semibold">Videos</span>
          </li>
          <li className="">
            {/* <WorkOutline className="sidebarIcon" /> */}
            <span className="font-semibold">Marketplace</span>
          </li>
          <li className="">
            {/* <Event className="sidebarIcon" /> */}
            <span className="font-semibold">Events</span>
          </li>
          <li className="">
            {/* <School className="sidebarIcon" /> */}
            <span className="font-semibold">Courses</span>
          </li>
        </ul>
        <button className="">Show More</button>
        <ul className=""></ul>
      </div>
    </div>
  );
}
