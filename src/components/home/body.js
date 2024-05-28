import React, {useState} from "react";
import Tab from "@/components/home/tab";
import FAQTab from "@/components/home/faq-tab";

function Body () {
  const [selectedTab, setSelectedTab] = useState("FAQs");
  return (
    <div>
      <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "FAQs" && (<FAQTab />)}
    </div>
  )
}

export default Body;