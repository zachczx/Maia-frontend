function Tab ({
    selectedTab,
    setSelectedTab,
}) {
  const tabs = ["Call Assistant", "Knowledge Base", "Query Classifier"];

  const handleSelectTab = (clickedTab) => {
    setSelectedTab(clickedTab);
  }

  return (
    <div className="w-full px-5 pt-7">
      <div className="border-b-2 border-gray-200 flex flex-row gap-x-3 text-sm">
        {tabs.map((tab, index) => (
          <button
            key={index} 
            onClick={() => handleSelectTab(tab)}
            className={`py-2 px-3 
              ${selectedTab === tab
                  ? "rounded-t-lg bg-accent text-white" 
                  : ""
              }
            `}>
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tab;
