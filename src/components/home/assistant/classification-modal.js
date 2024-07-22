import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { TailSpin } from "react-loader-spinner";

function ClassificationModal({
  setClassificationModalOpen,
}) {
  const modalRef = useRef();
  const headers = ["Query Type", "Category", "Sub Category", "Root Cause", "Sentiment"];

  const initialFormValues = headers.reduce((acc, header) => {
    acc[header] = '';
    return acc;
  }, {});

  const [formValues, setFormValues] = useState(initialFormValues);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setClassificationModalOpen(false);
  };

  const handleUpload = () => {
    setLoading(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setClassificationModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setClassificationModalOpen]);

  return (
    <div className="inset-0 fixed w-screen h-screen z-50 flex justify-center items-center">
      <div 
        ref={modalRef} 
        className="absolute bg-white rounded-md border border-gray-200 shadow-lg z-50 w-96 h-fit p-5 text-sm"
      >
        <div className="pb-2">
          <p className="font-semibold text-base">Classification Result</p>
          <p className="text-xs">Revise the details as needed.</p>
        </div>
        <div>
          {headers.map((header, index) => (
            <div className="mb-3" key={index}>
              <input
                type="text"
                name={header}
                value={formValues[header]}
                onChange={handleInputChange}
                placeholder={header}
                className="border border-2 border-gray-200 w-full rounded-lg px-2 py-1 focus:outline-0"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-rows gap-3 justify-between mt-8 mx-16">
          <button 
            className={`${loading ? "hidden": "px-2 py-1.5 rounded-lg text-sm border border-2 border-accent"}`} 
            onClick={handleCancel}
          >
            Rerun Analysis
          </button>
          <button 
            className={`px-2 py-1.5 rounded-lg text-xs bg-accent text-white ${loading ? "mx-auto": ""}`} 
            disabled={loading} 
            onClick={handleUpload}
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
              : <span>Upload Record</span>
              }
          </button>
        </div>
      </div>
    </div>
  );
}

ClassificationModal.propTypes = {
  setClassificationModalOpen: PropTypes.func.isRequired,
};

export default ClassificationModal;
