import React, {useRef, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { TailSpin } from "react-loader-spinner";

function EditModal({
  setEditModalOpen,
  resource,
  setRerender,
}){
  const modalRef = useRef();
  const headers = ["Name", "Category", "Sub Category", "Sub Subcategory", "Tag"];
  const [loading, setLoading] = useState(false);
  const [currValues, setCurrValues] = useState({
    "name": resource.name,
    "category": resource.category,
    "sub_category": resource.sub_category,
    "sub_subcategory": resource.sub_subcategory,
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

    return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currValues),
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            setRerender(true);
            setEditModalOpen(false);
            setLoading(false);
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
    setLoading(true);
    resource = updateResource();
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
          <div className="pb-2">
            <p className="font-semibold text-base">Edit Knowledge Base Resource</p>
            <p className="text-xs">Revise the details as needed</p>
          </div>
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
          <button 
            className={`${loading ? "hidden": "px-2 py-1.5 rounded-lg text-sm border border-2 border-accent"}`} 
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            className={`px-2 py-1.5 rounded-lg text-sm bg-accent text-white ${loading ? "mx-auto": ""}`} 
            disabled={loading} 
            onClick={handleConfirm}
          >
            {loading ? 
                <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
              : <span>Confirm</span>
              }
          </button>
        </div>
      </div>
    </div>
  )
}

EditModal.propTypes = {
  setEditModalOpen: PropTypes.func.isRequired,
  resource: PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      sub_category: PropTypes.string.isRequired,
      sub_subcategory: PropTypes.string.isRequired,
      tag: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  setRerender: PropTypes.func.isRequired,
};

export default EditModal;