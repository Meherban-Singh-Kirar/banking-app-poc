import Header from "../shared/components/Header";
import AdminSidebar from "../shared/components/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      {/* Fixed Header */}
      <Header />

      <div className="flex pt-16 h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 ml-64 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
