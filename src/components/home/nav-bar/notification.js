import React, { useRef, useState, useEffect} from "react";
import { IoNotifications } from "react-icons/io5";
import NotifMessage from "@/components/home/nav-bar/notif-message";

function CustomNotification () {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleNotificationOpen = () => {
    setNotificationOpen(!notificationOpen);
  };

  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setNotificationOpen]);

  return(
    <div>
      <button className="flex pt-0.5" onClick={handleNotificationOpen}>
        <IoNotifications size={22} className="text-white"/>
      </button>
      {notificationOpen && (
        <div className="absolute mt-[14px] right-0 bg-white rounded-md border border-gray-200 shadow-lg z-50 w-80 max-h-72 h-fit p-4 text-sm" ref={dropdownRef}>
          <p className="text-sm font-semibold">Notifications</p>
          <div>
            <NotifMessage type="warning" content="200% increase in user reports regarding inaccessible NS enlistment details." timestamp="2024-07-18T03:23:47Z" />
            <NotifMessage type="info" content="Slower website loading times on MINDEF NS portal." timestamp="2024-07-18T03:24:15Z" />
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomNotification;