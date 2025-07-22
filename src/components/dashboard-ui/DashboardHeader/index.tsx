// import OrganizationDropdown from "../../ui/OrganizationDropdown";
import Sidebar from "../DahboardLayout/Sidebar";

export default function DashboardHeader({ unreadNotifications }: { unreadNotifications: number }) {
  return (
    <div className="bg-white flex gap-4 items-center justify-between py-4 px-8 fixed top-0 w-full z-50 shadow-md">
      <div className="flex items-center gap-4">
        <Sidebar unreadNotifications={unreadNotifications} />
        <a href="/">
          <img
            src="/feedafrica.svg"
            alt="Feed Africa"
            width={150}
            height={64}
            className="w-[100px]"
          />
        </a>
      </div>
      {/* <OrganizationDropdown /> */}
    </div>
  );
}
