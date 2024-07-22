import React, { useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaRegFaceFrown, FaRegFaceMeh, FaRegFaceSmile } from "react-icons/fa6";

function EditModal({
  setEditModalOpen,
  resource,
  setRerender,
}) {
  const modalRef = useRef();
  const headers = ["Call Duration", "Root Cause", "Suggested Reply", "Conversation", "Notes"];
  const matchedHeaders = [["Customer", "Timestamp"], ["Channel", "Query Type"], ["Category", "Sub Category"], ["Sub Subcategory", "Sentiment"]];
  const mandatoryFields = ["customer", "channel", "query_type", "category", "sub_category", "root_cause", "sentiment", "suggested_reply", "conversation", "resolution"]
  const currValues = {
    customer: resource.customer,
    timestamp: formatDateTime(resource.timestamp),
    channel: renderChannel(resource.channel),
    query_type: resource.query_type,
    category: resource.category,
    sub_category: resource.sub_category,
    sub_subcategory: resource.sub_subcategory,
    root_cause: resource.root_cause,
    sentiment: renderSentimentIcon(resource.sentiment),
    suggested_reply: resource.suggested_reply,
    conversation: resource.conversation,
    call_duration: resource.call_duration,
    resolution: renderResolution(resource.resolution),
    follow_up_needed: resource.follow_up_needed,
    follow_up_date: resource.follow_up_date,
    notes: resource.notes,
  };

  const convertToDBName = (str) => {
    return str.replace(" ", "_").toLowerCase();
  };

  function renderSentimentIcon(sentiment) {
    switch (sentiment) {
      case 'Positive':
        return (
          <div className="flex flex-row gap-1">
            <FaRegFaceSmile className="text-green-500" title="Positive" size={17} />
            <span>Positive</span>
          </div>
        );
      case 'Neutral':
        return (
          <div className="flex flex-row gap-1">
            <FaRegFaceMeh className="text-yellow-500" title="Neutral" size={17} />
            <span>Neutral</span>
          </div>
        );
      case 'Negative':
        return (
          <div className="flex flex-row gap-1">
            <FaRegFaceFrown className="text-red-500" title="Negative" size={17} />
            <span>Negative</span>
          </div>
        );
      default:
        return null;
    }
  }

  // function renderFollowUpNeeded(followUpNeeded) {
  //   if (followUpNeeded) {
  //     return (
  //       <div className="rounded-lg px-2 py-1 bg-yellow-500 text-white text-xs">
  //           Follow-Up Needed
  //       </div>
  //     );
  //   }
  //   return null;
  // }

  function renderChannel(channel) {
    switch(channel) {
        case 0: return 'Call';
        case 1: return 'Web Chat';
        case 2: return 'Email';
        default: return 'Unknown';
    }
  };

  function renderResolution(resolution) {
    switch(resolution) {
      case true: 
        return (
          <div className="rounded-lg px-2 py-1 bg-green-500 text-white text-xs">
            Resolved
          </div>
        );
      case false: 
        return (
          <div className="rounded-lg px-2 py-1 bg-red-500 text-white text-xs">
            Unresolved
          </div>
        );
    }
  }

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    
    // Options for formatting
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    
    return date.toLocaleString('en-US', options);
  }

  const updateResource = () => {
    const url = `http://127.0.0.1:8000/api/engagement/${resource.id}/`;
    const formData = new FormData();
    resource.resolution = true;

    Object.keys(resource).forEach(key => {
      if (mandatoryFields.includes(key)) {
        formData.append(key, resource[key]);
      }
    });

    return fetch(url, {
        method: 'PUT',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            setRerender(true);
            setEditModalOpen(false);
            return data.response;
        }
    })
    .catch((error) => {
        console.error(error);
        setEditModalOpen(false);
        return "An error has occurred";
    });
};



  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEditModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setEditModalOpen]);

  return (
    <div className="inset-0 fixed w-screen h-screen z-50 flex justify-center items-center">
      <div ref={modalRef} className="absolute bg-white rounded-md border border-gray-200 shadow-lg z-50 w-[50%] h-[80%] overflow-y-auto overflow-x-auto p-5 text-sm">
        <div>
          <div className="pb-5 flex flex-row justify-between ">
            <div>
              <p className="font-semibold text-base">Edit Customer Engagement Record</p>
              <p className="text-xs">Revise the details as needed</p>
            </div>
            <div>
            {currValues["resolution"]}
            </div>
          </div>
          {matchedHeaders.map((match, index) => (
            <div className="grid grid-cols-2 mb-3 text-xs" key={index}>
              <div>
                <p className="font-semibold text-gray-400">{match[0]}</p>
                <div className="py-1">{currValues[convertToDBName(match[0])] || "-"}</div>
              </div>
              <div>
                <p className="font-semibold text-gray-400">{match[1]}</p>
                <div className="py-1">{currValues[convertToDBName(match[1])] || "-"}</div>
              </div>
            </div>
          ))}
          {headers.map((header, index) => (
            <div className="mb-3 text-xs" key={index}>
              <p className="font-semibold text-gray-400">{header}</p>
              <div className="py-1">{currValues[convertToDBName(header)] || "-"}</div>
            </div>
          ))}
        </div>
        {!resource.resolution && (
          <div className="flex justify-center">
            <button 
              className="px-2 py-1.5 rounded-lg text-xs bg-accent text-white" 
              onClick={updateResource}
            >
              Mark as Resolved
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

EditModal.propTypes = {
  setEditModalOpen: PropTypes.func.isRequired,
  resource: PropTypes.shape({
    customer: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    channel: PropTypes.number.isRequired,
    query_type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sub_category: PropTypes.string.isRequired,
    sub_subcategory: PropTypes.string,
    root_cause: PropTypes.string.isRequired,
    sentiment: PropTypes.string.isRequired,
    suggested_reply: PropTypes.string,
    conversation: PropTypes.string,
    call_duration: PropTypes.string,
    resolution: PropTypes.bool.isRequired,
    follow_up_needed: PropTypes.bool.isRequired,
    follow_up_date: PropTypes.string,
    notes: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  setRerender: PropTypes.func.isRequired,
};

export default EditModal;
