import React, {useRef, useEffect} from "react";
import PropTypes from 'prop-types';

function ContextModal({
  setContextModalOpen,
  content,
}){
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setContextModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setContextModalOpen]);

  const handleCancel = () => {
    setContextModalOpen(false);
  }

  const formattedContent = () => {
    const parts = content.split('\n\n\n\n');
    const question = parts[0] ? `Question:\n${parts[0]}` : '';
    const answer = parts[1] ? `Answer:\n${parts[1]}` : '';
    return `${question}\n\n${answer}`;
  };

  return (
    <div className="inset-0 fixed w-screen h-screen z-50 flex justify-center items-center">
      <div ref={modalRef} className="absolute bg-white rounded-md border border-gray-200 shadow-lg z-50 w-[40%] max-h-[80%] overflow-y-auto p-5 text-xs">
        <div className="mb-5 whitespace-pre-wrap">
          {formattedContent(content)}
        </div>
        <div className="flex justify-center">
          <button 
            className="px-2 py-1.5 rounded-lg text-xs bg-accent text-white"
            onClick={handleCancel}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

ContextModal.propTypes = {
    setContextModalOpen: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
  };

export default ContextModal;