import React, { useRef, useEffect } from "react";
import PropTypes from 'prop-types';

function ProfileModal({
  setProfileModalOpen,
  profile,
}) {
  const modalRef = useRef();

  const handleCancel = () => {
    setProfileModalOpen(false);
  };

  const renderChannel = (channel) => {
    const channels = channel.split('/');
    return channels.map((ch) => {
      switch (parseInt(ch, 10)) {
        case 0: return 'Call';
        case 1: return 'Web Chat';
        case 2: return 'Email';
        default: return 'Unknown';
      }
    }).join(' / ');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setProfileModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setProfileModalOpen]);

  return (
    <div className="inset-0 fixed w-screen h-screen z-50 flex justify-center items-center">
      <div 
        ref={modalRef} 
        className="absolute bg-white rounded-md border border-gray-200 shadow-lg z-50 w-[40%] max-h-[80%] overflow-y-auto p-5 text-sm"
      >
        <div className="pb-4">
          <p className="font-semibold text-base">Customer Profile</p>
          <p className="text-xs">This information is generated based on the past caller history.</p>
        </div>
        <div className="w-full text-sm">
          <div className="grid grid-cols-2 mb-3 text-xs">
            <div>
              <p className="font-semibold text-gray-400">Number of Engagements</p>
              <div className="py-1">{profile.analytics.engagement_num}</div>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Engagement Resolution Rate</p>
              <div className="py-1">{profile.analytics.resolution_status} %</div>
            </div>
          </div>
          <div className="grid grid-cols-2 mb-3 text-xs">
            <div>
              <p className="font-semibold text-gray-400">Preferred Channel</p>
              <div className="py-1">{renderChannel(profile.analytics.preferred_channel)}</div>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Aggression History</p>
              <div className="py-1">{profile.analytics.past_aggression ? "Yes" : "No"}</div>
            </div>
          </div>
          <div className="mb-3 text-xs">
            <p className="font-semibold text-gray-400">Summary</p>
            <div className="py-1">{profile.analytics.summary}</div>
            </div>
        </div>
        <div className="flex flex-row justify-center mt-8 mx-16">
          <button 
            className="px-2 py-1.5 rounded-lg text-sm bg-accent text-white" 
            onClick={handleCancel}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

ProfileModal.propTypes = {
  setProfileModalOpen: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default ProfileModal;
