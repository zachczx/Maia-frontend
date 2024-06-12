import React, {useState} from "react";
import { TailSpin } from "react-loader-spinner";

function ClassifierTab() {
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const headers = ["Query Type", "Category", "Sub Category", "Root Cause", "Sentiment", "Suggested Reply"];
  const [fetchedData, setFetchedData] = useState(false);
  const [data, setData] = useState(
    {
      "query_type": "",
      "category": "",
      "sub_category": "",
      "root_cause": "",
      "sentiment": "",
      "suggested_reply": "",
      "log": []
    }
  );

  const convertToJsonName = (str) => {
    return str.replace(" ", "_").toLowerCase()
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const fetchData = () => {
    const url = 'http://127.0.0.1:8000/api/query/';

    var json = {}

    if (fetchedData) {
      json["query"] = feedback
      json["history"] = data.log
    } else {
      json["query"] = query
    }

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
            setFetchedData(true)
            setLoading(false);
        }
    })
    .catch((error) => {
        console.log(error)
        return "An error has occurred";
    });
  }
  
  const handleClick = () => {
    setLoading(true);
    console.log(loading)
    fetchData();
  }

  return (
    <div className="py-8 px-8 w-full grid grid-cols-5 h-full gap-12 overflow-y-auto" style={{ height: 'calc(100vh - 121px)' }}>

      <div className={` flex flex-col gap-6 h-[85%] ${fetchedData ? 'col-span-5 md:col-span-2 h-[75%]' : 'col-span-5 h-[85%]'}`}>
        <textarea
          className={`border border-2 border-gray-200 rounded-lg w-full focus:outline-0 p-2 text-sm ${fetchedData ? 'h-[65%]': 'h-[100%]'}`}
          placeholder="Copy and paste content here for analysis"
          onChange={handleQueryChange}
          value={query}
          disabled={fetchedData}
        />
        <input 
          type='text'
          className={`"border border-2 border-gray-200 rounded-lg w-full h-fit focus:outline-0 p-2 text-sm ${fetchedData ? '' : 'hidden'}`}
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
              <div className="flex-grow h-full py-2 ">
                {data[convertToJsonName(header)]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassifierTab;