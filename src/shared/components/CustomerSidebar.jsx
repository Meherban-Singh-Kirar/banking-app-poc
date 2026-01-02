import { NavLink } from "react-router-dom";

function CustomerSidebar() {
  return (
    <div className="h-screen w-50 bg-gray-700 text-white fixed left-0 top-10">
      <nav className="p-4 space-y-3">
        <NavLink className="block hover:text-blue-300" to="transfer">
          Transfer
        </NavLink>
        <NavLink className="block hover:text-blue-300" to="payments">
          Payments
        </NavLink>
        <NavLink className="block hover:text-blue-300" to="statements">
          Statements
        </NavLink>
        <NavLink className="block hover:text-blue-300" to="transactionHistory">
          Transaction History
        </NavLink>
      </nav>
    </div>
  );
}

export default CustomerSidebar;
