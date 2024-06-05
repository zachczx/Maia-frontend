import React from "react";
import { TbMessageCircleQuestion } from "react-icons/tb";

function ChatIcon({
    setChatWindowOpen,
}) {
    const handleClick = () => {
      setChatWindowOpen(true);
    };

    return (
      <div className="w-12 h-12 rounded-full border flex justify-self-end self-end justify-center items-center m-5 bg-accent" onClick={handleClick}>
        <TbMessageCircleQuestion size={22} color="white"/>
      </div>
    );
  }
  
  export default ChatIcon;
  