import React from "react";
import PropTypes from 'prop-types';
import Transcript from "@/components/home/assistant/transcript"
import TextInput from "@/components/home/assistant/text-input"

function AssistantTab({
  channel,
  setStep,
  information,
  setInformation,
  setContent,
}) {
  
  return (
    <div className="w-full h-full grid grid-cols-5">
      {channel === "Call" ? (
        <Transcript setContent={setContent} setStep={setStep}/>
      ) : (
        <TextInput setContent={setContent} setStep={setStep} channel={channel} />
      )}
      {/* <Information information={information} setInformation={setInformation} /> */}
    </div>
  )
}

AssistantTab.propTypes = {
  channel: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
  information: PropTypes.object.isRequired,
  setInformation: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
};


export default AssistantTab;