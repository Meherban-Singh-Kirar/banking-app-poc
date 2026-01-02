import Header from "../shared/components/Header";
import CustomerSidebar from "../shared/components/CustomerSidebar";
import { Outlet } from "react-router-dom";

function CustomerLayout() {
  return (
    <>
      {/* Fixed Header */}
      <Header />

      <div className="flex pt-16 h-screen overflow-hidden">
        {/* Sidebar */}
        <CustomerSidebar />

        {/* Main Content */}
        <main className="flex-1 ml-64 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default CustomerLayout;
