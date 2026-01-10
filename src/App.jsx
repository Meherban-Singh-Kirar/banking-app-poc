import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/components/Login";
import Signup from "./auth/components/Signup";
import AdminDashboard from "./admin/AdminDashboard";
import CustomerDashboard from "./accounts/components/CustomerDashboard";
import Transfer from "./transactions/Transfer";
import Payments from "./payments/Payments";
import Statements from "./statements/Statements";
import ProtectedRoute from "./auth/ProtectedRoute";
import Unauthorized from "./auth/components/Unauthorized";
import CustomerLayout from "./layouts/CustomerLayout";
import TransactionHistory from "./transactions/TransactionHistory";
import AdminLayout from "./layouts/AdminLayout";
import ManageCustomers from "./admin/ManageCustomers";
import Accounts from "./accounts/components/Accounts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<Signup />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/adminDashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="manageCustomers" element={<ManageCustomers />} />
        <Route path="accounts" element={<Accounts />} />
      </Route>

      {/* CUSTOMER ROUTES */}
      <Route
        path="/customerDashboard"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="transactionHistory" element={<TransactionHistory />} />
        <Route path="payments" element={<Payments />} />
        <Route path="statements" element={<Statements />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}
