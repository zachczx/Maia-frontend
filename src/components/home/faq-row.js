import React, {useState} from "react";
import FAQModal from "./faq-modal";

function FAQRow ({
  question,
  answer,
  category,
  tag,
  index,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = () => {
    setModalOpen(true);
  }

  return (
    <> 
      <div 
        className={`grid grid-cols-6 text-sm py-3 px-5 w-screen
          ${index%2 === 1 
            ? "" 
            : "bg-blue-50" 
          }
        `}
        onClick={handleRowClick}
      >
        <div className="px-2 truncate col-span-2">{question}</div>
        <div className="px-2 truncate col-span-2">{answer}</div>
        <div className="px-2 truncate">{category}</div>
        <div className="px-2 truncate">{tag}</div>
      </div>

      {modalOpen && <FAQModal setModalOpen={setModalOpen} />}
    </>
  )
}

export default FAQRow;