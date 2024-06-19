import React, {useRef, useEffect} from "react";

function Result ({
 fetchedData,
 data,
 setData,
}) {
  const headers = ["Query Type", "Category", "Sub Category", "Root Cause", "Sentiment"];

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

  return(
    <div className={`flex flex-col gap-5 h-full ${fetchedData ? 'col-span-5 md:col-span-3' : 'hidden'}`}>
      {headers.map((header, index) => (
        <div key={index} className="flex flex-row text-sm gap-4">
          <div>
            <div className="flex-none py-2 px-2 bg-blue-50 rounded-lg w-[140px] h-[36px] text-center font-semibold">
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
      <div className="flex flex-row text-sm gap-4">
        <div>
          <div className="flex-none py-2 px-2 bg-blue-50 rounded-lg w-[140px] h-[36px] text-center font-semibold">
            Suggested Reply
          </div>
        </div>
        <div className="w-full relative">
          <div ref={hiddenDivRef} className="absolute top-0 left-0 w-full p-2 border-2 border-gray-200 rounded-lg whitespace-pre-wrap" style={{ visibility: 'hidden', pointerEvents: 'none' }}></div>
          <textarea
            ref={textareaRef}
            className="flex-grow py-2 w-full rounded-lg border border-2 border-gray-200 focus:outline-none p-2 resize-none overflow-hidden"
            value={data["suggested_reply"]}
            onChange={(e) => {
            setData({ ...data, suggested_reply: e.target.value });
            syncContent();
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Result;