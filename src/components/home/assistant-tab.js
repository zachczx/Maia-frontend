import React, {useState} from "react";
import { SlCallIn } from "react-icons/sl";

function AssistantTab() {
  const call_history = [
    {
      "id": "1",
      "caller_info": {
        "name": "Jon Tan",
        "phone_number": "91234567",
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
      },
      "call_notes": "this is the call notes",
      "conversation": {
        "timestamp": "2024-06-06T08:10:37.324479Z",
        "duration": "",
        "content": {}
      },
    }
  ];

  const [selectedCall, setSelectedCall] = useState(call_history[0]);

  const convertTimestamp = (timestamp) => {
    const [date, time] = timestamp.split("T");
    const shortenedTime = time.slice(0,5);
    return date + " " + shortenedTime
  }

  const handleChange = () => {

  }

  return (
    <div className=" w-full grid grid-cols-7" style={{ height: 'calc(100vh - 121px)' }}>
      <div className="flex flex-col border-r border-gray-200 text-sm">
        {call_history.map((call, index) => (
          <div className={`py-4 px-8 ${selectedCall.id === call.id ? 'bg-blue-50 border-l-2 border-accent' : 'border-b'}`} key={index} onClick={() => setSelectedCall(call)}>
            <p>{call.caller_info.name}</p>
            <p className="text-gray-700 text-xs italic pt-1">{convertTimestamp(call.conversation.timestamp)}</p>
          </div>
        ))}
      </div>
      <div className="py-4 px-8 col-span-4">
        <div className="border-b border-gray-200 pb-2 flex flex-row justify-between">
          <div className="font-semibold">
            Transcript
          </div>
          <button className="flex flex-row gap-2 items-center bg-call-green text-white px-2 py-1 rounded-lg">
            <SlCallIn />
            <span className="text-sm ">
              Accept Call
            </span>
          </button>
        </div>
        <div>

        </div>
      </div>

      <div className="p-4 flex flex-col border-l border-gray-200 gap-5 col-span-2">
        <div className="h-fit w-full bg-blue-50 py-2 px-3 rounded-lg">
          <p className="font-semibold mb-3">
            Caller Info
          </p>
          <div className="">
            <div className="grid grid-cols-5 mb-3 text-sm">
              <p className="col-span-2">Name</p>
              <input
                  type="text"
                  id="name"
                  value={selectedCall.caller_info.name}
                  onChange={handleChange}
                  className="border border-2 border-gray-200 col-span-3 rounded-lg px-2 py-1 focus:outline-0"
                />
            </div>
            <div className="grid grid-cols-5 mb-3 text-sm">
              <p className="col-span-2">Phone Number</p>
              <input
                  type="text"
                  id="name"
                  value={selectedCall.caller_info.name}
                  onChange={handleChange}
                  className="border border-2 border-gray-200 col-span-3 rounded-lg px-2 py-1 focus:outline-0"
                />
            </div>
          </div>
        </div>
        <div className="h-full w-full bg-blue-50 py-2 px-3 rounded-lg">
          <textarea className="focus:outline-0 p-2 w-full h-full bg-blue-50 text-sm" placeholder="Enter call notes here"/>
        </div>
      </div>
    </div>
  )
}

export default AssistantTab;