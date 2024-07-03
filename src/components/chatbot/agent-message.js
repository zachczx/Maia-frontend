import React from "react";
import PropTypes from 'prop-types';

function AgentMessage ({
    content,
}) {
  return (
    <div className="bg-gray-200 h-fit w-fit max-w-[65%] rounded-t-lg rounded-br-lg p-2 text-xs break-words">
      { content }
    </div>
  )
}

AgentMessage.propTypes = {
  content: PropTypes.string.isRequired,
};

export default AgentMessage;