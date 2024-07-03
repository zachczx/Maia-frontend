import React, {useState} from "react";
import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

function EngagementRow ({
  index,
  item,
}){
  const [showButtons, setShowButtons] = useState(false);

  const renderChannel = (channel) => {
    switch(channel) {
        case 0: return 'Call';
        case 1: return 'Web Chat';
        case 2: return 'Email';
        default: return 'Unknown';
    }
  };

  const convertDateTime = (datetime) => {
    const date = datetime.split("T")[0];
    return date
  }

  const renderResolution = (resolution) => {
    switch (resolution) {
      case true:
        return <FaCheckCircle className="text-green-500" />;
      case false:
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <tr 
      onMouseEnter={() => setShowButtons(true)} 
      onMouseLeave={() => setShowButtons(false)}
      className={index % 2 === 0 ? 'bg-blue-50' : ''}
    >
      <td className="pl-8 pr-2 py-3">{item.customer}</td>
      <td className="px-2 py-3">{renderChannel(item.channel)}</td>
      <td className="px-2 py-3">{item.query_type}</td>
      <td className="px-2 py-3">{item.category}</td>
      <td className="px-2 py-3">{item.sub_category}</td>
      <td className="px-2 py-3">{item.sub_subcategory}</td>
      <td className="px-2 py-3">{item.sentiment}</td>
      <td className="px-2 py-3">{convertDateTime(item.timestamp)}</td>
      <td className="pr-8 pl-7 py-3">{renderResolution(item.resolution)}</td>
      <td className="px-2 py-3 flex flex-row gap-3">
        <FaRegEdit size={17} className={`${showButtons ? '' : 'hidden'}`}/>
        <FaRegTrashCan size={16} className={`${showButtons ? '' : 'hidden'}`} />
      </td>
    </tr>
  )
}

EngagementRow.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    customer: PropTypes.string.isRequired,
    channel: PropTypes.number.isRequired,
    query_type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sub_category: PropTypes.string.isRequired,
    sub_subcategory: PropTypes.string.isRequired,
    sentiment: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    resolution: PropTypes.bool.isRequired,
  }).isRequired,
};

export default EngagementRow;