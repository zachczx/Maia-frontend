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
        className="absolute bg-white rounded-md border border-gray-200 shadow-lg z-50 w-96 max-h-[80%] overflow-y-auto p-5 text-sm"
      >
        <div className="pb-2">
          <p className="font-semibold text-base">Customer Profile</p>
          <p className="text-xs">This information is generated based on the past caller history.</p>
        </div>
        <div>
          <table className="mb-3 table-auto text-sm w-full">
            <tbody>
              <tr>
                <td className="py-1 font-semibold">Customer ID</td>
                <td className="px-2 py-1">{profile.id}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Number of engagements</td>
                <td className="px-2 py-1">{profile.analytics.engagement_num}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Engagement Resolution</td>
                <td className="px-2 py-1">{profile.analytics.resolution_status}%</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Preferred Channel</td>
                <td className="px-2 py-1">
                {profile.analytics.preferred_channel === "0"
                  ? "Call"
                  : profile.analytics.preferred_channel === "1"
                  ? "Web Chat"
                  : profile.analytics.preferred_channel === "2"
                  ? "Email"
                  : ""}
                </td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">History of Aggression</td>
                <td className="px-2 py-1">{profile.analytics.past_aggression ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Summary</td>
                <td className="px-2 py-1">{profile.analytics.summary}</td>
              </tr>
            </tbody>
          </table>
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
