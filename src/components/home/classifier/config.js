import React from "react";
import PropTypes from 'prop-types';
import OutputFormat from "@/components/home/classifier/output-format";
import PastResponse from "@/components/home/classifier/past-responses";
import ExtraInformation from "@/components/home/classifier/extra-information";

function Config({
  requestData,
  setRequestData,
}) {
  return (
    <div className="border-r border-gray-200 col-span-1 px-8 pb-4 overflow-y-auto" style={{ height: 'calc(100vh - 121px)' }}>
      <OutputFormat requestData={requestData} setRequestData={setRequestData} />
      <PastResponse requestData={requestData} setRequestData={setRequestData} />
      <ExtraInformation requestData={requestData} setRequestData={setRequestData} />
    </div>
  )
}

export default Config;

Config.propTypes = {
    requestData: PropTypes.shape({
      case_information: PropTypes.string,
      response_format: PropTypes.string,
      response_template: PropTypes.string,
      past_responses: PropTypes.string,
      extra_information: PropTypes.string,
    }).isRequired,
    setRequestData: PropTypes.func.isRequired,
  };
