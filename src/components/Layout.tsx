import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
