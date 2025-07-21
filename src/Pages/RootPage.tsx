import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const RootPage = () => {

  useEffect(() => {
    const doSyncPendingCategories = async () => {

    };

    // ✅ Run immediately if online
    if (navigator.onLine) {
      doSyncPendingCategories();
    }

    // ✅ Run when coming back online
    window.addEventListener("online", doSyncPendingCategories);

    return () => {
      window.removeEventListener("online", doSyncPendingCategories);
    };
  });

  return (
    <>
      <Outlet />
    </>
  );
};

export default RootPage;
