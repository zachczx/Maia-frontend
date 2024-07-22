import React, { useState} from "react";
import PropTypes from 'prop-types';
import ContextModal from "@/components/chatbot/context-modal";

function AgentMessage({ content }) {
  const [context, setContext] = useState("");
  const [contextModalOpen, setContextModalOpen] = useState(false);

  const detectLinks = (text) => {
    const regex = /\[([^\]]+)\]\s*\((https?:\/\/[^\s)]+)\)/g;
    let result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      result.push(text.substring(lastIndex, match.index));

      const isBackendLink = match[2].startsWith('http://BACKEND_LINK/');
      const processedLink = isBackendLink ? match[2].replace('http://BACKEND_LINK', 'http://127.0.0.1:8000/api/kbembedding') : match[2];

      if (isBackendLink) {
        result.push(
          <a
            className="underline text-accent"
            key={match.index}
            href="#"
            onClick={() => handleBackendLinkClick(processedLink)}
          >
            [{match[1]}]
          </a>
        );
      } else {
        result.push(
          <a
            className="underline text-accent"
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
          >
            [{match[1]}]
          </a>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    result.push(text.substring(lastIndex));

    return result;
  };

  const handleBackendLinkClick = (url) => {

    // Check if the last character of the URL is a "/"
    if (url.slice(-1) !== '/') {
      url += '/';
    }

    return fetch(url, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      setContext(data.content);
      setContextModalOpen(true);
      return data
    })
    .catch((error) => {
      console.log(error);
      return;
    });
  }

  return (
    <div className="bg-gray-200 h-fit w-fit max-w-[75%] rounded-t-lg rounded-br-lg p-2 text-xs break-words">
      {detectLinks(content)}
      {contextModalOpen && (
        <ContextModal 
          setContextModalOpen={setContextModalOpen} 
          content={context}
        />
      )}
    </div>
  );
}

AgentMessage.propTypes = {
  content: PropTypes.string.isRequired,
};

export default AgentMessage;
