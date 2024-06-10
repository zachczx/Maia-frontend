import React, {useEffect, useState} from "react";
import ResourceRow from "@/components/home/resource-row";
import { MdAddCircle } from "react-icons/md";

function KBTab () {
  const headers = ["Name", "Category", "Sub Category", "Created at", "Last Updated"];
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const url = 'http://127.0.0.1:8000/api/resource/';
      return fetch(url, {
          method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
          if (data.data) {
            setResources(Array.from(data.data));
          }
      })
      .catch((error) => {
          console.log(error)
      });
    }
    fetchData();
  }, [])

  return (
    <div className="w-full pt-4">
      <div className="px-5 grid grid-cols-7 text-sm border-b-2 border-gray-200 text-gray-500">
        {headers.map((header, index) => (
          <div key={index} className={`px-2 pb-3 pt-4 ${header === "Name" ? "col-span-2" : ""}`}>
            {header}
          </div> 
        ))}
        <div className="pt-2">
          <button className="text-sm bg-accent text-white px-3 py-1.5 rounded-lg flex flex-row gap-2">
            <MdAddCircle size={20}/>
            <span>Add Resource</span>
          </button>
        </div>
      </div> 

      <div className="overflow-x-hidden overflow-y-auto" style={{ height: 'calc(100vh - 191px)' }}>
        {resources.map((resource, index) => (
          <ResourceRow 
            key={index} 
            index={index}
            resource={resource}
          />
        ))}
      </div>
    </div>
  )
}

export default KBTab;