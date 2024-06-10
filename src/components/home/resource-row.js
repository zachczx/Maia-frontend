import React, {useState} from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from "@/components/home/delete-modal";
import EditModal from "@/components/home/edit-modal";

function ResourceRow ({
  index,
  resource
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

  return (
    <> 
      <div
        onMouseEnter={() => setShowButtons(true)} 
        onMouseLeave={() => setShowButtons(false)}
        className={`grid grid-cols-7 text-sm py-3 px-5 w-screen
          ${index%2 === 1 
            ? "" 
            : "bg-blue-50" 
          }
        `}
      >
        <div className="px-2 truncate col-span-2">{resource.name}</div>
        <div className="px-2 truncate">{resource.category}</div>
        <div className="px-2 truncate">{resource.sub_category}</div>
        <div className="px-2 truncate">{convertDateTime(resource.created_at)}</div>
        <div className="px-2 truncate">{convertDateTime(resource.updated_at)}</div>
        <div className={`px-2 truncate ${showButtons ? 'flex flex-rows gap-3' : 'hidden'}`}>
          <FaRegEdit size={17} onClick={handleEditModalOpen}/>
          <FaRegTrashCan size={16} onClick={handleDeleteModalOpen}/>
        </div>
      </div>
      {editModalOpen && (
        <EditModal setEditModalOpen={setEditModalOpen} resource={resource}  />
      )}
      {deleteModalOpen && (
        <DeleteModal setDeleteModalOpen={setDeleteModalOpen} id={resource.id} name={resource.name} />
      )}
    </>
  )
}

export default ResourceRow;