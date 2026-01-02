import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="h-screen w-50 bg-gray-700 text-white fixed left-0 top-10">
      <nav className="p-4 space-y-3">
        <NavLink className="block hover:text-blue-300" to="manageCustomers">
          All Customers
        </NavLink>
      </nav>
    </div>
  );
}

export default AdminSidebar;
