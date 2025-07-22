import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure Toast styles are imported
import "../../../assets/globals.css"; // Keep your global styles

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-source-sans-3 antialiased">
      <ToastContainer position="top-right" />
      {children}
    </div>
  );
}
