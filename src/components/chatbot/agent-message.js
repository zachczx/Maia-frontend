import React from "react";

function AgentMessage ({
    content,
}) {
  return (
    <div className="bg-gray-200 h-fit w-fit max-w-[65%] rounded-t-lg rounded-br-lg p-2 text-xs">
      { content }
    </div>
  )
}

export default AgentMessage;