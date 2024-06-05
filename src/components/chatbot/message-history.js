import React from "react";
import AgentMessage from "@/components/chatbot/agent-message";
import ClientMessage from "@/components/chatbot/client-message";

function MessageHistory ({
    messages,
    timestamp,
}) {
  return (
    <div className="h-[80%] p-3 overflow-y-auto">
      <div className="text-xs flex justify-center pb-2">{ timestamp }</div>
      <div className="flex flex-col gap-y-2">
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            {message.role === "agent" 
              ? <AgentMessage content={message.content} />
              : <ClientMessage content={message.content} />
            }
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default MessageHistory;