import React, { useState} from "react";
import { IoMdSend } from "react-icons/io";

function InputBar ({
    setMessages,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleQuerySubmit();
    }
  };

  const getChatResponse = (message) => {
    const url = 'http://127.0.0.1:8000/api/chat/';
    const formData = new FormData();
    formData.append('query', message);

    return fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.response) {
            return data.response;
        }
    })
    .catch((error) => {
        return "An error has occurred."
    });
  }

  const handleQuerySubmit = async () => {
    setMessages(prevMessages => [
      ...prevMessages,
      {content: inputValue, role: "client"}
    ]);
    

    //get response
    const response = await getChatResponse(inputValue)
    console.log(response)
    setInputValue("");

    //append response
    setMessages(prevMessages => [
      ...prevMessages,
      {content: response, role: "agent"}
    ]);
    
  };

  return (
    <div className="border-t border-grey-500 h-[20%] flex flex-row justify-between">
      <input 
        type="text" 
        className="border-0 focus:outline-0 py-2 px-3 text-sm items-center w-full rounded-lg" 
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your question here"
        value={inputValue}
      />
      <button className="self-center px-2" onClick={handleQuerySubmit}>
        <IoMdSend size={20}/>
      </button>
    </div>
  )
}

export default InputBar;