"use client";
import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, SetOnlineStatus] = useState(true);
  useEffect(() => {
    window.addEventListener("offline", (e) => {
      SetOnlineStatus(false);
    });
    window.addEventListener("online", (e) => {
      SetOnlineStatus(true);
    });
  }, []);

  return onlineStatus;
};

export { useOnlineStatus };
