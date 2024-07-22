import React, {useEffect, useState} from "react";
import ResourceRow from "@/components/home/kb/resource-row";
import { MdAddCircle } from "react-icons/md";
import AddModal from "@/components/home/kb/add-modal";

function KBTab () {
  const headers = ["Name", "Category", "Sub Category", "Sub Subcategory", "Created at", "Last Updated"];
  const [resources, setResources] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [rerender, setRerender] = useState(false);

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
            setRerender(false);
          }
      })
      .catch((error) => {
          console.log(error);
          setRerender(false);
      });
    }
    fetchData();
  }, [rerender])

  const handleAddModalOpen = () => {
    setAddModalOpen(!addModalOpen);
  };

  return (
    <div className="w-full pt-4">
      <div className="px-5 grid grid-cols-8 text-sm border-b-2 border-gray-200 text-gray-500">
        {headers.map((header, index) => (
          <div key={index} className={`px-2 pb-3 pt-4 ${header === "Name" ? "col-span-2" : ""}`}>
            {header}
          </div> 
        ))}
        <div className="pt-2">
          <button 
            className="text-xs bg-accent text-white px-3 py-1.5 rounded-lg flex flex-row gap-2"
            onClick={handleAddModalOpen}
          >
            <MdAddCircle size={20}/>
            <span className="flex self-center">Add Resource</span>
          </button>
        </div>
      </div> 

      <div className="overflow-x-hidden overflow-y-auto" style={{ height: 'calc(100vh - 191px)' }}>
        {resources.map((resource, index) => (
          <ResourceRow 
            key={index} 
            index={index}
            resource={resource}
            setRerender={setRerender}
          />
        ))}
      </div>

      {addModalOpen && (
        <AddModal 
          setAddModalOpen={setAddModalOpen}
          setRerender={setRerender} 
        />
      )}
    </div>
  )
}

export default KBTab;