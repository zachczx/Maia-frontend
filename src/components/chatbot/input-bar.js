import React, { useEffect, useState} from "react";
import { IoMdSend } from "react-icons/io";

function InputBar ({
  messages,
  setMessages,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleQuerySubmit();
    }
  };

  useEffect(() => {
    const fetchData = () => {
      const url = 'http://127.0.0.1:8000/api/chat/';
      const data = {
        chat_history: messages
      };
      console.log(data)
      return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
          if (data.response) {
              return data.response;
          }
      })
      .catch((error) => {
          console.log(error)
          return "An error has occurred";
      });
    }

    const getChatResponse = async () => {
      //get response
      const response = await fetchData()
      
      //append response
      setMessages(prevMessages => [
        ...prevMessages,
        {content: response, role: "agent"}
      ]);
    }

    if (messages.length%2 === 0 && messages.length !== 0){
      getChatResponse()
    }
  }, [messages, setMessages])
  

  const handleQuerySubmit = () => {
    setMessages(prevMessages => [
      ...prevMessages,
      {content: inputValue, role: "client"}
    ]); 
    setInputValue("");
  };

  return (
    <div className="border-t border-grey-500 h-[20%] flex flex-row justify-between">
      <input 
        type="text" 
        className="border-0 focus:outline-0 py-2 px-3 text-xs items-center w-full rounded-lg" 
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