import React, { useState} from "react";
import Record from "@/components/home/engagement/record";
import AssistantTab from "@/components/home/assistant/assistant-tab";
import ClassifierTab from "@/components/home/classifier/classifier-tab";

function Engagement () {
  const [step, setStep] = useState(1) // 1- record, 2 - information, 3- - classifier
  const [channel, setChannel] = useState("")
  const [content, setContent] = useState("");
  const [information, setInformation] = useState({
    "first_name": "",
    "last_name": "",
    "phone_number": "",
    "email": "",
    "call_notes": "",
  })

  return (
    <div className="w-full overflow-auto" style={{ height: 'calc(100vh - 121px)' }}>
      {step === 1 && (
        <Record setStep={setStep} setChannel={setChannel} />
      )}
      {step === 2  && (
        <AssistantTab channel={channel} setStep={setStep} information={information} setInformation={setInformation} setContent={setContent} />
      )}
      {step === 3  && (
        <ClassifierTab content={content} information={information} channel={channel} setStep={setStep}/>
      )}
    </div>
  )
}

export default Engagement;