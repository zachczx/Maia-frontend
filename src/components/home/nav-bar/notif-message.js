import React from 'react';
import { FaInfoCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

function NotifMessage({
    type,
    content,
    timestamp,
}) {
    let icon;
    let outlineColor;

    switch (type) {
        case 'info':
            icon = <FaInfoCircle />;
            outlineColor = 'text-blue-500';
            break;
        case 'warning':
            icon = <FaExclamationTriangle />;
            outlineColor = 'text-yellow-500';
            break;
        case 'error':
            icon = <FaTimesCircle />;
            outlineColor = 'text-red-500';
            break;
        default:
            icon = <FaInfoCircle />;
            outlineColor = 'text-gray-500';
            break;
    }

    const calculateTimeFromNow = (timestamp) => {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const diffMs = now - messageTime;
        const diffMinutes = Math.round(diffMs / (1000 * 60));
        const diffHours = Math.round(diffMinutes / 60);
    
        if (diffMinutes < 1) {
            return 'Just Now';
        } else if (diffMinutes < 60) {
            return `${diffMinutes} min ago`;
        } else if (diffHours === 1) {
            return `${diffHours} hour ago`;
        } else {
            return `${diffHours} hours ago`;
        }
    }

    return (
        <div className="w-full py-3 flex flex-row items-center">
            <div className={`mr-3 text ${outlineColor}`}>
                {icon}
            </div>
            <div className="flex flex-col text-xs gap-1">
                <div>
                    {content}
                </div>
                <div className='text-[10px] text-gray-400'>
                    {calculateTimeFromNow(timestamp)}
                </div>
            </div>
        </div>
    )
}

export default NotifMessage;
