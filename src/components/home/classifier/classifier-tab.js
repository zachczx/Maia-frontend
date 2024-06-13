import React, { useState, useRef, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

function ClassifierTab() {
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [data, setData] = useState({
    query_type: "",
    category: "",
    sub_category: "",
    root_cause: "",
    sentiment: "",
    suggested_reply: "",
    log: []
  });

  const headers = ["Query Type", "Category", "Sub Category", "Root Cause", "Sentiment"];

  const convertToJsonName = (str) => str.replace(" ", "_").toLowerCase();

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const fetchData = () => {
    const url = 'http://127.0.0.1:8000/api/query/';

    const json = fetchedData
      ? { query: feedback, history: data.log }
      : { query };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json),
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        console.log(data);
        setData(data);
        setFetchedData(true);
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      return "An error has occurred";
    });
  }

  const handleClick = () => {
    setLoading(true);
    fetchData();
  };

  const textareaRef = useRef(null);
  const hiddenDivRef = useRef(null);

  const syncContent = () => {
    const textarea = textareaRef.current;
    const hiddenDiv = hiddenDivRef.current;
    hiddenDiv.textContent = textarea.value + '\u200b'; // Add zero-width space to ensure height is updated
    textarea.style.height = 'auto'; // Reset height to allow shrinking
    textarea.style.height = hiddenDiv.scrollHeight + 'px'; // Adjust textarea height
  };

  useEffect(() => {
    if (data.suggested_reply) {
      syncContent();
    }
  }, [data.suggested_reply]);

  return (
    <div className="py-8 px-8 w-full grid grid-cols-5 h-full gap-12 overflow-y-auto" style={{ height: 'calc(100vh - 121px)' }}>
      <div className={`flex flex-col gap-6 ${fetchedData ? 'col-span-5 md:col-span-2' : 'col-span-5'}`}>
        <textarea
          className={`border border-2 border-gray-200 rounded-lg w-full focus:outline-0 p-2 text-sm ${fetchedData ? 'h-[65%]' : 'h-[100%]'}`}
          placeholder="Copy and paste content here for analysis"
          onChange={handleQueryChange}
          value={query}
          disabled={fetchedData}
        />
        <input
          type='text'
          className={`border border-2 border-gray-200 rounded-lg w-full h-fit focus:outline-0 p-2 text-sm ${fetchedData ? '' : 'hidden'}`}
          placeholder="Enter feedback for a more accurate analysis"
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <div className="flex justify-center">
          <button
            className="bg-accent py-2 px-3 text-sm text-white rounded-lg"
            onClick={handleClick}
            disabled={loading}
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
              fetchedData ? 'Rerun Analysis' : 'Run Analysis'
            )}
          </button>
        </div>
      </div>

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
    </div>
  );
}

export default ClassifierTab;
