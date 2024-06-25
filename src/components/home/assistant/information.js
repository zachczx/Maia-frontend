function Information ({
    selectedCall
}) {
  return (
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
              className="border border-2 border-gray-200 col-span-3 rounded-lg px-2 py-1 focus:outline-0"
            />
          </div>
          <div className="grid grid-cols-5 mb-3 text-sm">
            <p className="col-span-2">Phone Number</p>
            <input
              type="text"
              id="name"
              value={selectedCall.caller_info.phone_number}
              className="border border-2 border-gray-200 col-span-3 rounded-lg px-2 py-1 focus:outline-0"
            />
            </div>
            <div className="grid grid-cols-5 mb-3 text-sm">
            <p className="col-span-2">Email Address</p>
            <input
              type="text"
              id="name"
              value={selectedCall.caller_info.email}
              className="border border-2 border-gray-200 col-span-3 rounded-lg px-2 py-1 focus:outline-0"
            />
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-blue-50 py-2 px-3 rounded-lg">
        <textarea className="focus:outline-0 p-2 w-full h-full bg-blue-50 text-sm" placeholder="Enter call notes here"/>
      </div>
    </div>
  )
}

export default Information;