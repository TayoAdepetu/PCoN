import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/globals.css";


export default function TheMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased min-h-screen w-full overflow-x-hidden overflow-y-auto">
      <ToastContainer position="top-right" />
      {children}
    </div>
  );
}
