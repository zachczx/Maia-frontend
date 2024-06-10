import React, {useRef, useEffect, useState} from "react";

function EditModal({
  setEditModalOpen,
  resource,
}){
  const modalRef = useRef();
  const headers = ["Name", "Category", "Sub Category", "Tag"];
  const [currValues, setCurrValues] = useState({
    "name": resource.name,
    "category": resource.category,
    "sub_category": resource.sub_category,
    "tag": resource.tag,
  })

  const convertToDBName = (str) => {
    return str.replace(" ", "_").toLowerCase()
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    const dbName = convertToDBName(id);
    setCurrValues((prevValues) => ({
      ...prevValues,
      [dbName]: value,
    }));
  };

  const updateResource = () => {
    const url = 'http://127.0.0.1:8000/api/resource/' + resource.id + "/";

    for (const header of headers) {
      if (currValues[convertToDBName(header)] === "" || currValues[convertToDBName(header)] === null){
        delete currValues[convertToDBName(header)]
      }
    }

    console.log(currValues);
    return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currValues),
    })
    .then(response => response.json())
    .then(data => {
        if (data.response) {
            console.log(data.response);
            return data.response;
        }
    })
    .catch((error) => {
        console.log(error)
        return "An error has occurred";
    });
  }

  const handleCancel = () => {
    setEditModalOpen(false);
  }

  const handleConfirm = () => {
    setEditModalOpen(false);
    resource = updateResource()
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEditModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setEditModalOpen]);

  return (
    <div className="inset-0 fixed w-screen h-screen z-50 flex justify-center items-center">
      <div ref={modalRef} className="absolute bg-white rounded-md border border-gray-200 shadow-lg z-50 w-96 h-fit p-5 text-sm">
        <div>
          {headers.map((header, index) => (
            <div className="grid grid-cols-3 mb-3" key={index}>
              <p>{header}</p>
              <input
                  type="text"
                  id={header}
                  value={currValues[convertToDBName(header)]}
                  onChange={handleChange}
                  className="border border-2 border-gray-200 col-span-2 rounded-lg px-2 py-1 focus:outline-0"
                />
            </div>
          ))}
        </div>
        <div className="flex flex-rows gap-3 justify-between mt-8 mx-16">
          <button className="px-2 py-1.5 rounded-lg text-sm border border-2 border-accent" onClick={handleCancel}>
            Cancel
          </button>
          <button className="px-2 py-1.5 rounded-lg text-sm bg-accent text-white" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditModal;