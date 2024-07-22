import React from 'react';
import PropTypes from 'prop-types';
import Suggestion from "@/components/home/assistant/suggestion";
import Speech from '@/components/home/assistant/speech';

function TranscriptSegment({ segment }) {
  if (segment.role === "suggestion") {
    return <Suggestion content={segment.content} />;
  }
  return <Speech role={segment.role} content={segment.content} />;
}

TranscriptSegment.propTypes = {
  segment: PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};

export default TranscriptSegment;
