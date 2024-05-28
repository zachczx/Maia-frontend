import { TbMessageCircleQuestion } from "react-icons/tb";
import Profile from "@/components/home/profile";

function NavBar () {
  return (
    <div className="w-screen h-fit bg-accent py-3 px-5 flex flex-row justify-between">
      <div className="flex flex-row gap-x-2">
        <TbMessageCircleQuestion size={25} color="white" />
        <div className="font-semibold text-white">
            Chat Bot Management System
        </div>
      </div>
      <Profile />
    </div>
  )
}

export default NavBar;