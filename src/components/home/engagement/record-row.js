import React, {useState} from "react";
import EditModal from "@/components/home/engagement/edit-modal"
import DeleteModal from "@/components/home/engagement/delete-modal"
import PropTypes from 'prop-types';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegTrashCan, FaRegFaceFrown, FaRegFaceMeh, FaRegFaceSmile } from "react-icons/fa6";
import { FaCheckCircle, FaTimesCircle, FaPhone, FaComments, FaEnvelope } from 'react-icons/fa';

function EngagementRow ({
  index,
  item,
  setRerender,
}){
  const [showButtons, setShowButtons] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };
  const handleEditModalOpen = () => {
    setEditModalOpen(!editModalOpen);
  };

  const renderChannel = (channel) => {
    switch (channel) {
      case 0: return <FaPhone className="text-gray-500" title="Call" />;
      case 1: return <FaComments className="text-gray-500" title="Web Chat" />;
      case 2: return <FaEnvelope className="text-gray-500" title="Email" />;
      default: return <span className="text-black">Unknown</span>;
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

  const formatCategory = (category) => {
    return category || "-";
  };

  const renderSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return <FaRegFaceSmile className="text-green-500" title="Positive" />;
      case 'Neutral':
        return <FaRegFaceMeh className="text-yellow-500" title="Neutral" />;
      case 'Negative':
        return <FaRegFaceFrown className="text-red-500" title="Negative" />;
      default:
        return null;
    }
  };

  return (
    <>
      <tr 
        onMouseEnter={() => setShowButtons(true)} 
        onMouseLeave={() => setShowButtons(false)}
        className={index % 2 === 0 ? 'bg-blue-50' : ''}
      >
        <td className="pl-14 pr-2 py-3 ">{item.customer}</td>
        <td className="pl-5 pr-2 py-3 pt-4">{renderChannel(item.channel)}</td>
        <td className="px-2 py-3">{item.query_type}</td>
        <td className="px-2 py-3">{formatCategory(item.category)}</td>
        <td className="px-2 py-3">{formatCategory(item.sub_category)}</td>
        <td className="px-2 py-3">{formatCategory(item.sub_subcategory)}</td>
        <td className="pl-8 pr-2 py-3">{renderSentimentIcon(item.sentiment)}</td>
        <td className="px-2 py-3">{convertDateTime(item.timestamp)}</td>
        <td className="pr-8 pl-7 py-3">{renderResolution(item.resolution)}</td>
        <td className="px-2 py-3 flex flex-row gap-3">
          <IoMdInformationCircleOutline  
            size={20} 
            className={`${showButtons ? 'flex self-center' : 'hidden'}`}
            onClick={handleEditModalOpen}
          />
          <FaRegTrashCan 
            size={16} 
            className={`${showButtons ? 'flex self-center' : 'hidden'}`} 
            onClick={handleDeleteModalOpen}
          />
        </td>
      </tr>
      {editModalOpen && (
        <EditModal 
          setEditModalOpen={setEditModalOpen} 
          resource={item}
          setRerender={setRerender}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal 
          setDeleteModalOpen={setDeleteModalOpen} 
          id={item.id} 
          setRerender={setRerender}
        />
      )}
    </>
  )
}

EngagementRow.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    customer: PropTypes.number.isRequired,
    channel: PropTypes.number.isRequired,
    query_type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sub_category: PropTypes.string.isRequired,
    sub_subcategory: PropTypes.string,
    sentiment: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    resolution: PropTypes.bool.isRequired,
  }).isRequired,
  setRerender: PropTypes.func.isRequired,
};

export default EngagementRow;