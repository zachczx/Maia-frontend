import React from 'react';
import Suggestion from "@/components/home/assistant/suggestion";
import Speech from '@/components/home/assistant/speech';

function TranscriptSegment({ segment }) {
  if (segment.role === "suggestion") {
    return <Suggestion content={segment.content} />;
  }
  return <Speech role={segment.role} content={segment.content} />;
}

export default TranscriptSegment;
