import { TbMessageCircleQuestion } from "react-icons/tb";
import Profile from "@/components/home/nav-bar/profile";
import CustomNotification from "@/components/home/nav-bar/notification";

function NavBar () {
  return (
    <div className="w-screen h-fit bg-accent py-3 px-5 flex flex-row justify-between">
      <div className="flex flex-row gap-x-2">
        <TbMessageCircleQuestion size={25} color="white" />
        <div className="font-semibold text-white">
            Call Center System
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <CustomNotification />
        <Profile />
      </div>
    </div>
  )
}

export default NavBar;