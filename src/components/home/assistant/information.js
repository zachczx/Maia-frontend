import React from 'react';

function Information({
  information,
  setInformation,
}) {
  const headers = ["First Name", "Last Name", "Phone Number", "Email"];

  const handleInputChange = (e, header) => {
    const { value } = e.target;
    setInformation(prevInfo => ({
      ...prevInfo,
      [header.toLowerCase().replace(" ", "_")]: value
    }));
  };

  const handleCallNotesChange = (e) => {
    const { value } = e.target;
    setInformation(prevInfo => ({
      ...prevInfo,
      call_notes: value
    }));
  };

  return (
    <div className="p-4 flex flex-col border-l border-gray-200 gap-5 col-span-2">
      <div className="h-fit w-full bg-blue-50 py-2 px-3 rounded-lg">
        <p className="font-semibold mb-3">
          Customer Info
        </p>

        <div className="flex flex-col text-sm">
          {headers.map((header, index) => (
            <div key={index} className="grid grid-cols-6 mb-2 text-sm">
              <p className="col-span-2 flex items-center">{header}</p>
              <input
                type="text"
                id={header}
                value={information[header.toLowerCase().replace(" ", "_")]}
                onChange={(e) => handleInputChange(e, header)}
                className="border border-2 border-gray-200 col-span-4 rounded-lg px-2 py-1 focus:outline-0"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="h-full w-full bg-blue-50 py-2 px-3 rounded-lg">
        <textarea
          value={information.call_notes}
          onChange={handleCallNotesChange}
          className="focus:outline-0 p-2 w-full h-full bg-blue-50 text-sm"
          placeholder="Enter notes here"
        />
      </div>
    </div>
  );
}

export default Information;
