import React, {useRef, useEffect} from "react";

function DeleteModal({
  setDeleteModalOpen,
  name,
  id,
}){
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDeleteModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setDeleteModalOpen]);

  const deleteResource = () => {
    const url = 'http://127.0.0.1:8000/api/resource/' + id + "/";

    return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.response) {
            console.log(data.response);
            return data.response;
        }
    })
    .catch((error) => {
        console.log(error)
        return "An error has occurred";
    });
  }

  const handleCancel = () => {
    setDeleteModalOpen(false);
  }

  const handleConfirm = () => {
    setDeleteModalOpen(false);
    deleteResource()
  }

  return (
    <div className="inset-0 fixed w-screen h-screen z-50 flex justify-center items-center">
      <div ref={modalRef} className="absolute bg-white rounded-md border border-gray-200 shadow-lg z-50 w-64 h-fit p-5 text-sm">
        <div className="text-center mb-5">
          Are you sure you want to delete 
          <span className="font-semibold px-1">
            {name}
          </span>
          from the Knowledge Base?
        </div>
        <div className="flex flex-rows gap-3 justify-between mx-8">
          <button className="px-2 py-1.5 rounded-lg text-sm border border-2 border-accent" onClick={handleCancel}>
            Cancel
          </button>
          <button className="px-2 py-1.5 rounded-lg text-sm bg-accent text-white" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;