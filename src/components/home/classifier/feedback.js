"use client"

import React, {useState} from "react";
import { TailSpin } from "react-loader-spinner";
import PropTypes from 'prop-types';

function Feedback ({
  data,
  setData,
}) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const fetchTextData = () => {
    setLoading(true);
    const url = 'http://127.0.0.1:8000/api/query/text/';

    console.log(data)

    const json = { case_information: feedback, history: data.log }

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
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      return "An error has occurred";
    });
  }


  return (
    <div className="mt-4">
      <p className="font-semibold mb-4">Feedback</p>
      <input
        type='text'
        className="border border-1 border-gray-500 rounded w-full h-fit focus:outline-0 p-2 text-xs"
        placeholder="Enter feedback for a more accurate analysis"
        value={feedback}
        onChange={handleFeedbackChange}
      />

<div className="flex justify-center mt-4">
        <button
          className="bg-accent p-2 text-xs text-white rounded h-[36px] w-[132px] flex justify-center items-center"
          disabled={loading}
          onClick={fetchTextData}
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
            'Submit Feedback'
          )}
        </button>
      </div>
    </div>
  )
}

export default Feedback;

Feedback.propTypes = {
  data: PropTypes.shape({
    case_title: PropTypes.string.isRequired,
    case_type: PropTypes.string.isRequired,
    case_description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sub_category: PropTypes.string.isRequired,
    sub_subcategory: PropTypes.string,
    sentiment: PropTypes.string.isRequired,
    suggested_reply: PropTypes.string.isRequired,
    log: PropTypes.arrayOf(PropTypes.object).isRequired, // Assuming log is an array of objects
  }).isRequired,
  setData: PropTypes.func.isRequired,
};