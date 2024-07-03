import React, { useState } from "react";
import PropTypes from 'prop-types';
import { TailSpin } from "react-loader-spinner";
import { AiOutlineBarChart } from 'react-icons/ai';

function TextInput({
  channel,
  setStep,
  setContent,
}) {
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  const fetchClassification = () => {
    setLoading(true);
    setStep(3);
    setContent(textValue);
  }

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  }

  return (
    <div className="pt-4 col-span-3 h-full">
      <div className="px-8 border-b border-gray-200 pb-2 flex flex-row justify-between">
        <div className="font-semibold">{channel} Content</div>
        <div className="flex flex-row gap-3">
          <button 
            className="flex flex-row gap-2 items-center text-sm text-white bg-accent px-2 py-1 rounded-lg" 
            onClick={fetchClassification}
          >
            {loading ? (
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
            ) : (
              <div className="flex flex-row gap-2">
                <AiOutlineBarChart size={20} />
                <span>Run Analysis</span>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="px-8 pt-4 h-full">
      <textarea
          className="w-full h-[85%] border border-gray-300 rounded-lg p-2 focus:outline-0 text-sm"
          placeholder={`Enter ${channel} content here...`}
          value={textValue} // Bind value to state
          onChange={handleTextChange} // Handle change event
        />
      </div>
    </div>
  )
}

TextInput.propTypes = {
    channel: PropTypes.string.isRequired,
    setStep: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired,
  };

export default TextInput;