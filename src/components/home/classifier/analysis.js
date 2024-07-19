import React from "react";
import Feedback from "@/components/home/classifier/feedback";
import Result from "@/components/home/classifier/result";
import PropTypes from 'prop-types';

function Analysis({
  fetchedData,
  data,
  setData,
  information,
  setInformation,
  content,
  setStep,
  channel,
}) {

  return (
    <div className={`p-5 overflow-y-auto ${fetchedData ? "col-span-2" : "col-span-1"}`} style={{ height: 'calc(100vh - 121px)' }}>
      <Result
        data={data} 
        setData={setData}
        information={information} 
        setInformation={setInformation} 
        content={content}
        setStep={setStep}
        channel={channel}
      />
      <Feedback 
        data={data} 
        setData={setData} 
      />
    </div>
  )
}

export default Analysis;

Analysis.propTypes = {
  fetchedData: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  information: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    country_code: PropTypes.number.isRequired,
    phone_number: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    call_notes: PropTypes.string,
  }).isRequired,
  setInformation: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
};