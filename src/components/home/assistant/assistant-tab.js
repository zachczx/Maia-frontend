import React, {useState} from "react";
import History from "@/components/home/assistant/history"
import Transcript from "@/components/home/assistant/transcript"
import Information from "@/components/home/assistant/information"

function AssistantTab() {
  const callHistory = [
    {
      "id": "1",
      "caller_info": {
        "name": "Jon Tan",
        "phone_number": "91234567",
        "email": "test@gmail.com"
      },
      "call_notes": "this is the call notes",
      "conversation": {
        "timestamp": "2024-06-06T08:10:37.324479Z",
        "duration": "",
        "content": {}
      },
    },
    {
      "id": "2",
      "caller_info": {
        "name": "Tan Xiao Ling",
        "phone_number": "91234567",
        "email": "test@gmail.com"
      },
      "call_notes": "this is the call notes",
      "conversation": {
        "timestamp": "2024-06-06T08:10:37.324479Z",
        "duration": "",
        "content": {}
      },
    },
    {
      "id": "3",
      "caller_info": {
        "name": "Amy Tay",
        "phone_number": "91234567",
        "email": "test@gmail.com"
      },
      "call_notes": "this is the call notes",
      "conversation": {
        "timestamp": "2024-06-06T08:10:37.324479Z",
        "duration": "",
        "content": {}
      },
    },
    {
      "id": "4",
      "caller_info": {
        "name": "Amy Tay",
        "phone_number": "91234567",
        "email": "test@gmail.com"
      },
      "call_notes": "this is the call notes",
      "conversation": {
        "timestamp": "2024-06-06T08:10:37.324479Z",
        "duration": "",
        "content": {}
      },
    }
  ];

  const [selectedCall, setSelectedCall] = useState(callHistory[0]);

  return (
    <div className=" w-full grid grid-cols-7" style={{ height: 'calc(100vh - 121px)' }}>
      <History callHistory={callHistory} selectedCall={selectedCall} setSelectedCall={setSelectedCall}/>
      <Transcript />
      <Information selectedCall={selectedCall} />
    </div>
  )
}

export default AssistantTab;