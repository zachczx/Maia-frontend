import React, {useState} from "react";
import FAQModal from "./faq-modal";

function FAQRow ({
  id,
  content,
  category,
  sub_category,
  index,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = () => {
    setModalOpen(true);
  }

  return (
    <> 
      <div 
        className={`grid grid-cols-7 text-sm py-3 px-5 w-screen
          ${index%2 === 1 
            ? "" 
            : "bg-blue-50" 
          }
        `}
        onClick={handleRowClick}
      >
        <div className="px-2 truncate">{id}</div>
        <div className="px-2 truncate col-span-4">{content}</div>
        <div className="px-2 truncate">{category}</div>
        <div className="px-2 truncate">{sub_category}</div>
      </div>

      {modalOpen && <FAQModal setModalOpen={setModalOpen} />}
    </>
  )
}

export default FAQRow;