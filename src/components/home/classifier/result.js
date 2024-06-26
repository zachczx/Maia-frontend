import React, {useRef, useEffect, useState} from "react";
import { TailSpin } from "react-loader-spinner";

function Result ({
  fetchedData,
  data,
  setData,
  information,
  content,
  setStep,
  channel,
}) {
  const headers = ["Query Type", "Category", "Sub Category", "Root Cause", "Sentiment"];
  const [loading, setLoading] = useState(false);

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

  const updateDB = () => {
    const url = 'http://127.0.0.1:8000/api/engagement/';

    const formData = new FormData();
    formData.append('customer_first_name', information.first_name);
    formData.append('customer_last_name', information.last_name);
    formData.append('customer_phone_number', information.phone_number);
    formData.append('customer_email', information.email);
    formData.append('notes', information.call_notes);
    formData.append("conversation", content)
    
    var channelInt;
    if (channel === "Call"){
      channelInt = 1;
    } else if (channel === "Web Chat") {
      channelInt = 2;
    } else if (channel === "Email") {
      channelInt = 3;
    } else {
      channelInt = 4;
    }
    formData.append("channel", channelInt);

    for (const header of headers) {
      formData.append(convertToJsonName(header), data[convertToJsonName(header)]);
    }

    formData.append("suggested_reply", data["suggested_reply"])

    return fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        setStep(1);
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      return "An error has occurred";
    });
  }

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
      <div className="flex justify-center mt-4">
          <button
            className="bg-accent py-2 px-3 text-sm text-white rounded-lg w-[132px] flex justify-center"
            disabled={loading}
            onClick={updateDB}
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
              'Confirm Details'
            )}
          </button>
        </div>
    </div>
  )
}

export default Result;