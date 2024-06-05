import React from "react";

function ClientMessage ({
    content,
}) {
    return (
      <div className="flex justify-end ">
        <div className="bg-accent h-fit w-fit max-w-[65%] rounded-t-lg rounded-bl-lg p-2 text-xs text-white">
          { content }
        </div>
      </div>
    )
  }
  
  export default ClientMessage;