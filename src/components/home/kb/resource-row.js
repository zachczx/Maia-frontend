import React, {useState} from "react";
import PropTypes from 'prop-types';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from "@/components/home/kb/delete-modal";
import EditModal from "@/components/home/kb/edit-modal";

function ResourceRow ({
  index,
  resource,
  setRerender,
}) {
  const [showButtons, setShowButtons] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };
  const handleEditModalOpen = () => {
    setEditModalOpen(!editModalOpen);
  };

  const convertDateTime = (datetime) => {
    const date = datetime.split("T")[0];
    return date
  }

  const formatCategory = (category) => {
    return category || "-";
  };

  return (
    <> 
      <div
        onMouseEnter={() => setShowButtons(true)} 
        onMouseLeave={() => setShowButtons(false)}
        className={`grid grid-cols-8 text-sm py-3 px-5 w-screen
          ${index%2 === 1 
            ? "" 
            : "bg-blue-50" 
          }
        `}
      >
        <div className="px-2 truncate col-span-2">{resource.name}</div>
        <div className="px-2 truncate">{formatCategory(resource.category)}</div>
        <div className="px-2 truncate">{formatCategory(resource.sub_category)}</div>
        <div className="px-2 truncate">{formatCategory(resource.sub_subcategory)}</div>
        <div className="px-2 truncate">{convertDateTime(resource.created_at)}</div>
        <div className="px-2 truncate">{convertDateTime(resource.updated_at)}</div>
        <div className={`px-2 truncate ${showButtons ? 'flex flex-rows gap-3' : 'hidden'}`}>
          <FaRegEdit size={17} onClick={handleEditModalOpen} />
          <FaRegTrashCan size={16} onClick={handleDeleteModalOpen} />
        </div>
      </div>
      {editModalOpen && (
        <EditModal 
          setEditModalOpen={setEditModalOpen} 
          resource={resource}
          setRerender={setRerender}
        />
      )}
      {deleteModalOpen && (
        <DeleteModal 
          setDeleteModalOpen={setDeleteModalOpen} 
          id={resource.id} 
          name={resource.name}
          setRerender={setRerender}
        />
      )}
    </>
  )
}

ResourceRow.propTypes = {
  index: PropTypes.number.isRequired,
  resource: PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      sub_category: PropTypes.string,
      sub_subcategory: PropTypes.string,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  setRerender: PropTypes.func.isRequired,
};


export default ResourceRow;