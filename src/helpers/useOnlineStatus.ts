import { useEffect } from "react";
import { onlineManager } from "@tanstack/react-query";

export function useOnlineStatus() {
  useEffect(() => {
    const updateOnlineStatus = () => {
      onlineManager.setOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
}
