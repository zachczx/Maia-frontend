import React, { useRef, useEffect } from "react";
import PropTypes from 'prop-types';

function Result ({
  data,
  setData,
  information,
  setInformation,
  content,
  setStep,
  channel,
}) {
  const headers = [
    "Case Title",
    "Case Type",
    "Case Description",
    "Priority",
    "Category",
    "Sub Category",
    "Sub Subcategory",
    "Sentiment",
  ];

  const convertToJsonName = (str) => str.replace(" ", "_").toLowerCase();

  const textareaRef = useRef(null);
  const hiddenDivRef = useRef(null);

  const syncContent = () => {
    const textarea = textareaRef.current;
    const hiddenDiv = hiddenDivRef.current;
    hiddenDiv.textContent = textarea.value + '\u200b'; 
    textarea.style.height = 'auto'; 
    textarea.style.height = hiddenDiv.scrollHeight + 'px'; 
  };

  useEffect(() => {
    if (data.suggested_reply) {
      syncContent();
    }
  }, [data.suggested_reply]);

  return (
    <div>
      <p className="font-semibold mb-4">Result</p>
      <div className="flex flex-col gap-2 text-xs">
        {headers.map((header, index) => (
          <div key={index} className="flex flex-row gap-4">
            <div>
              <div className="flex-none py-2 px-2 bg-blue-50 rounded w-[140px] h-[36px] text-center font-semibold">
              {header}
              </div>
            </div>
            <div>
              <div className="flex-grow h-full p-2">
              {data[convertToJsonName(header)]}
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-row text-xs gap-4">
          <div className="flex-none py-2 px-2 bg-blue-50 rounded w-[140px] h-[36px] text-center font-semibold">
            Suggested Reply
          </div>
          <div className="w-full relative">
            <div ref={hiddenDivRef} className="absolute top-0 left-0 w-full p-2 border-2 border-gray-200 rounded-lg whitespace-pre-wrap" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
            </div>
            <textarea
              ref={textareaRef}
              className="flex-grow py-2 w-full rounded border border-1 border-gray-400 focus:outline-none p-2 resize-none overflow-hidden"
              value={data["suggested_reply"]}
              onChange={(e) => {
              setData({ ...data, suggested_reply: e.target.value });
              syncContent();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result;

Result.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  information: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    country_code: PropTypes.number,
    phone_number: PropTypes.number,
    email: PropTypes.string,
    call_notes: PropTypes.string,
  }),
  setInformation: PropTypes.func,
  content: PropTypes.string,
  setStep: PropTypes.func,
  channel: PropTypes.string,
};