import React, { useState, useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import Result from "@/components/home/classifier/result"
import { MdOutlineFileUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function ClassifierTab() {
  const fileInputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [fileName, setFileName] = useState('');
  const [data, setData] = useState({
    query_type: "",
    category: "",
    sub_category: "",
    root_cause: "",
    sentiment: "",
    suggested_reply: "",
    log: []
  });

  const handleQueryChange = (event) => {
    setQuery(event.target.value);

    clearAudioData();
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const fetchTextData = () => {
    const url = 'http://127.0.0.1:8000/api/query/text/';

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
        setQuery(data.query);
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

  const fetchAudioData = () => {
    const url = 'http://127.0.0.1:8000/api/query/audio/';

    const formData = new FormData();
    const file = fileInputRef.current.files[0];
    if (file) {
      formData.append('query', file);
    }
    

    return fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        setQuery(data.query);
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
    if(query !== "") {
      fetchTextData();
    } 
    if (fileName !== "") {
      console.log("in here")
      fetchAudioData();
    }
  };

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      setFileName(file.name);
    }
    setQuery("");
  };

  const clearAudioData = () => {
    //clear file input
    fileInputRef.current.value = null;
    setTimeout(() => {
      setFileName('');
    }, 500);
  }

  return (
    <div className="py-8 px-8 w-full grid grid-cols-5 h-full gap-12 overflow-y-auto" style={{ height: 'calc(100vh - 121px)' }}>
      <div className={`flex flex-col gap-6 ${fetchedData ? 'col-span-5 md:col-span-2' : 'col-span-5'}`}>
        <textarea
          className={`border border-2 border-gray-200 rounded-lg w-full focus:outline-0 p-2 text-sm ${fetchedData ? 'h-[35%]' : 'h-[30%]'}`}
          placeholder="Copy and paste text content here for analysis (e.g emails, web chat messages)"
          onChange={handleQueryChange}
          value={query}
          disabled={fetchedData || fileName !== ""}
        />
        <div className={`flex flex-col gap-5 ${fetchedData ? 'hidden': ''}`}>
          <div className="flex flex-row gap-3 justify-between my-4">
            <hr className="border border-1 flex self-center w-[35%]"/>
            <p className="text-sm">OR upload audio file</p>
            <hr className="border border-1 flex self-center w-[35%] "/>
          </div>
          <div>
            <label 
              htmlFor="file-upload" 
              className="rounded-lg py-2 border border-2 border-gray-200 w-full flex flex-row gap-1 justify-center cursor-pointer text-sm relative"
            >
              <MdOutlineFileUpload size={20} className="flex self-center"/>
              {fileName ? fileName : "Choose Audio File (Supported file types: .wav)"}
              <RxCross2 className={`absolute flex self-center right-2 ${fileName === '' ? 'hidden' : ''}`} size={20} onClick={clearAudioData} />
            </label>
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              accept=".wav" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              disabled={fileName !== ''}
            />
          </div>
        </div>
        <input
          type='text'
          className={`border border-2 border-gray-200 rounded-lg w-full h-fit focus:outline-0 p-2 text-sm ${fetchedData ? '' : 'hidden'}`}
          placeholder="Enter feedback for a more accurate analysis"
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <div className="flex justify-center mt-4">
          <button
            className="bg-accent py-2 px-3 text-sm text-white rounded-lg w-[132px] flex justify-center"
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

      <Result 
        fetchedData={fetchedData} 
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default ClassifierTab;
