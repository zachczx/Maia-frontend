import React, {useState} from "react";
import Tab from "@/components/home/tab";
import KBTab from "@/components/home/kb/kb-tab";
import ClassifierTab from "@/components/home/classifier/classifier-tab";
import AssistantTab from "@/components/home/assistant/assistant-tab";

function Body () {
  const [selectedTab, setSelectedTab] = useState("Call Assistant");
  return (
    <div>
      <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "Knowledge Base" && (<KBTab />)}
      {selectedTab === "Query Classifier" && (<ClassifierTab />)}
      {selectedTab === "Call Assistant" && (<AssistantTab />)}
    </div>
  )
}

export default Body;