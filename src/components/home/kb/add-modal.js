import React, { useRef, useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";

function AddModal({
  setAddModalOpen,
  setRerender,
}) {
  const modalRef = useRef();
  const fileInputRef = useRef(null);
  const headers = ["Name", "Category", "Sub Category", "Sub Subcategory", "Tag"];
  const compulsory = ["Name", "Category", "Sub Category"];

  const initialFormValues = headers.reduce((acc, header) => {
    acc[header] = '';
    return acc;
  }, {});

  const [formValues, setFormValues] = useState(initialFormValues);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const convertToDBName = (str) => {
    return str.replace(" ", "_").toLowerCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const addResource = () => {
    const url = 'http://127.0.0.1:8000/api/file/';
    const formData = new FormData();

    for (const header of headers) {
      const dbFieldName = convertToDBName(header);
      formData.append(dbFieldName, formValues[header]);
    }

    const file = fileInputRef.current.files[0];
    if (file) {
      formData.append('file', file);
    }

    return fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        setRerender(true);
        setAddModalOpen(false);
        setLoading(false);
        return data;
      }
    })
    .catch((error) => {
      console.log(error);
      return "An error has occurred";
    });
  };

  const handleCancel = () => {
    setAddModalOpen(false);
  };

  const handleConfirm = () => {
    setLoading(true);
    addResource().then(() => {
      
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAddModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setAddModalOpen]);

  return (
    <div className="inset-0 fixed w-screen h-screen z-50 flex justify-center items-center">
      <div 
        ref={modalRef} 
        className="absolute bg-white rounded-md border border-gray-200 shadow-lg z-50 w-96 h-fit p-5 text-sm"
      >
        <div className="pb-2">
          <p className="font-semibold text-base">Add Knowledge Base Resource</p>
          <p className="text-xs">Please fill in the information and upload a file</p>
        </div>
        <div>
          {headers.map((header, index) => (
            <div className="mb-3" key={index}>
              <input
                type="text"
                name={header}
                value={formValues[header]}
                onChange={handleInputChange}
                placeholder={`${header}${compulsory.includes(header) ? '*' : ''}`}
                className="border border-2 border-gray-200 w-full rounded-lg px-2 py-1 focus:outline-0"
              />
            </div>
          ))}
          <div className="mb-3 w-full">
            <p className="text-sm font-semibold">Upload Your File</p>
            <p className="text-xs mb-3">Supported file types: .xlsx</p>
            <label 
              htmlFor="file-upload" 
              className="rounded-lg py-1 border border-2 border-gray-200 w-full flex flex-row gap-1 justify-center cursor-pointer"
            >
              <MdOutlineFileUpload size={20} />
              {fileName ? fileName : "Choose File"}
            </label>
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              accept=".xlsx" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
          </div>
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
  );
}

export default AddModal;
