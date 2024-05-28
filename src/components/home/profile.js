import React, {useState, useEffect, useRef} from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

function Profile () {
  const [profileOpen, setProfileOpen] = useState(false);

  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
  };

  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setProfileOpen]);

  const handleLogOut = () => {
    // do sth here
    setProfileOpen(false);
  }

  return (
    <div>
      <button onClick={handleProfileOpen}>
        <IoPersonCircleOutline size={25} color="white" />
      </button>
      {profileOpen && (
        <div className="absolute mt-[7px] right-0 bg-white rounded-md border border-gray-200 shadow-lg z-50 w-32 py-2 px-3 text-sm" ref={dropdownRef}>
          <div onClick={handleLogOut}>
            Log Out
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile;