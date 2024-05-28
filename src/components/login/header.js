import { TbMessageCircleQuestion } from "react-icons/tb";

function Header () {
  return (
    <div className="flex flex-row justify-center gap-x-2">
      <TbMessageCircleQuestion size={30}/>
      <div className="text-lg font-bold ">
        Chat Bot Management System
      </div>
    </div>
  )
}

export default Header;