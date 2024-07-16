import React from "react";
import PropTypes from 'prop-types';

function AgentMessage({ content }) {
  const detectLinks = (text) => {
    const regex = /\[([^\]]+)\]\s*\((https?:\/\/[^\s)]+)\)/g;
    let result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      result.push(text.substring(lastIndex, match.index));
      result.push(
        <a className="underline text-accent" key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    result.push(text.substring(lastIndex));

    return result;
  };

  return (
    <div className="bg-gray-200 h-fit w-fit max-w-[75%] rounded-t-lg rounded-br-lg p-2 text-xs break-words">
      {detectLinks(content)}
    </div>
  );
}

AgentMessage.propTypes = {
  content: PropTypes.string.isRequired,
};

export default AgentMessage;
