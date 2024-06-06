import React, {useEffect, useState} from "react";
import InputBar from "@/components/chatbot/input-bar";
import MessageHistory from "@/components/chatbot/message-history";
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, addTimeStamp } from '../../features/chatHistorySlice'; 

function Body () {
  const [messages, setMessages] = useState([]);
  const [timestamp, setTimestamp] = useState();
  const chatMessages = useSelector(state => state.chatHistory.messages);
  const timestampHistory = useSelector(state => state.chatHistory.timestamp);
  const dispatch = useDispatch();

  function getTimestamp() {
    const date = new Date();

    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month}, ${hours}:${minutes}`;
  }

  useEffect(() => {
    // This will run every time `messages` changes.
    console.log('Messages have changed:', chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    console.log('Full state check:', chatMessages);
  if (chatMessages.length === 0) {
    const defaultFirstMessage = {role: "agent", content: "Hello! How can I assist you with your current task?"};
    const tempTimestamp = getTimestamp();

    // Dispatching and setting local state
    dispatch(addMessage(defaultFirstMessage));
    dispatch(addTimeStamp(tempTimestamp));

    // Update local component state after dispatch
    setTimeout(() => {
      setMessages([defaultFirstMessage]);
      setTimestamp(tempTimestamp);
      console.log('Updated state after delay:', chatMessages);
    }, 2000); // A short timeout can ensure the log runs after state updates
  } else {
    setMessages(chatMessages); 
    setTimestamp(timestampHistory);
  }
  }, [dispatch, chatMessages, timestampHistory])

  return (
    <div className="bg-white rounded-lg w-full h-64">
      <MessageHistory messages={messages} timestamp={timestamp} />
      <InputBar messages={messages} setMessages={setMessages} />
    </div>
  )
}

export default Body;