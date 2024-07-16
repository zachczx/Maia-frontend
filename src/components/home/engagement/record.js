import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EngagementRow from "@/components/home/engagement/record-row";
import { MdAddCircle } from "react-icons/md";

function Record({
  setStep,
  setChannel,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleOptionClick = (option) => {
    setChannel(option);
    setStep(2);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchData = () => {
      const url = 'http://127.0.0.1:8000/api/engagement/';
      return fetch(url, {
          method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
          if (data) {
            setData(Array.from(data));
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


  const headers = [
    "Customer ID", 
    "Channel", 
    "Query Type", 
    "Category", 
    "Sub Category", 
    "Sub Subcategory", 
    "Sentiment", 
    "Created At", 
    "Resolution"
  ]

  return (
    <div className="pt-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className={`px-2 pt-2 pb-2.5 font-normal text-gray-500 text-left
                  ${index === 0 ? 'px-0 pl-8 pr-2' : ''} 
                  ${index === headers.length - 1 ? 'px-0 pr-8 pl-2' : ''}`}
              >
                {header}
              </th>
            ))}
            <th>
            <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-sm bg-accent font-normal text-white px-3 py-1.5 rounded-lg flex flex-row gap-2 mb-2"
                >
                  <MdAddCircle size={20} />
                  <span>Add Record</span>
                </button>
                {dropdownOpen && (
                  <div className="font-normal absolute right-0 mt-0.5 w-48 bg-white rounded-md shadow-lg z-20">
                    <ul>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClick('Call')}
                      >
                        Add Call
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClick('Web Chat')}
                      >
                        Add Web Chat
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClick('Email')}
                      >
                        Add Email
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
            <EngagementRow 
              key={index}
              item={item}
              index={index}
              setRerender={setRerender}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

Record.propTypes = {
  setStep: PropTypes.func.isRequired,
  setChannel: PropTypes.func.isRequired,
};

export default Record;
