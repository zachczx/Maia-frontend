import React, {useState} from "react";
import Tab from "@/components/home/tab";
import Engagement from "@/components/home/engagement/engagement";

function Body () {
  const [selectedTab, setSelectedTab] = useState("Engagement Record");
  return (
    <div>
      <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "Engagement Record" && (<Engagement />)}
    </div>
  )
}

export default Body;