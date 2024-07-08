import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { TailSpin } from "react-loader-spinner";
import Result from "@/components/home/classifier/result"

function ClassifierTab({
  content,
  information,
  setInformation,
  channel,
  setStep,
}) {
  const [query, setQuery] = useState(content);
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

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
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
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="py-8 px-8 w-full grid grid-cols-5 h-full gap-12 overflow-y-auto" style={{ height: 'calc(100vh - 121px)' }}>
      <div className={`flex flex-col gap-6 ${fetchedData ? 'col-span-5 md:col-span-2' : 'col-span-5'}`}>
        <textarea
          className={`border border-2 border-gray-200 rounded-lg w-full focus:outline-0 p-2 text-sm ${fetchedData ? 'h-[35%]' : 'h-[50%]'}`}
          onChange={handleQueryChange}
          value={query}
          disabled={query !== ""}
        />
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
              'Rerun Analysis'
            )}
          </button>
        </div>
      </div>

      <Result 
        fetchedData={fetchedData}
        data={data}
        setData={setData}
        information={information}
        setInformation={setInformation}
        content={content}
        setStep={setStep}
        channel={channel}
      />
    </div>
  );
}

ClassifierTab.propTypes = {
  content: PropTypes.string.isRequired,
  information: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    call_notes: PropTypes.string.isRequired,
  }).isRequired,
  setInformation: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
};

export default ClassifierTab;
