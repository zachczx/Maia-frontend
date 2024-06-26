import React from "react";
import Transcript from "@/components/home/assistant/transcript"
import TextInput from "@/components/home/assistant/text-input"
import Information from "@/components/home/assistant/information"

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
      <Information information={information} setInformation={setInformation} />
    </div>
  )
}

export default AssistantTab;