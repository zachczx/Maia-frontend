import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types';
import Config from "@/components/home/classifier/config";
import Case from "@/components/home/classifier/case";
import Analysis from "@/components/home/classifier/analysis";
import { useAuth } from "../../../auth/auth-context";

function ClassifierTab({
  content,
  information,
  setInformation,
  channel,
  setStep,
}) {
  const { fetchWithAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    case_information: content,
    response_format: "",
    response_template: "",
    past_responses: "",
    extra_information: "",
  });
  const [fetchedData, setFetchedData] = useState(false);
  const [data, setData] = useState({
    "case_title": "",
    "case_type": "",
    "case_description": "",
    "priority": "",
    "category": "",
    "sub_category": "",
    "sub_subcategory": "",
    "sentiment": "",
    "suggested_reply": "",
    "log": []
  });

  const fetchTextData = useCallback(() => {
    const url = 'http://127.0.0.1:8000/api/query/text/';

    const filteredData = Object.fromEntries(
      Object.entries(requestData).filter(([key, value]) => value !== null && value !== "")
    );

    const json = filteredData;

    return fetchWithAuth(url, {
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
        setTimeout(() => {
          setFetchedData(true);
      }, 1000);
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      return "An error has occurred";
    });
  }, [requestData, setData, setFetchedData]);

  const handleClick = useCallback(() => {
    setLoading(true);
    if (requestData.case_information !== "" ) {
      fetchTextData();
    }
  }, [fetchTextData, requestData]);

  return (
    <div className="w-full grid grid-cols-3 overflow-y-auto" style={{ height: 'calc(100vh - 121px)' }}>
      {!fetchedData && (
        <Config requestData={requestData} setRequestData={setRequestData} />
      )}
      <Case
        fetchedData={fetchedData}
        query={content} 
        handleClick={handleClick}
        loading={loading}
      />
      {fetchedData && (
        <Analysis
          fetchedData={fetchedData}
          data={data}
          setData={setData}
          information={information}
          setInformation={setInformation}
          content={content}
          setStep={setStep}
          channel={channel}
        />
      )}
    </div>
  );
}

ClassifierTab.propTypes = {
  content: PropTypes.string,
  information: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    phone_number: PropTypes.string,
    email: PropTypes.string,
    call_notes: PropTypes.string,
  }),
  setInformation: PropTypes.func,
  channel: PropTypes.string,
  setStep: PropTypes.func,
};

export default ClassifierTab;
