import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../../auth/components/AuthContextAPI";

function CustomerDashboard() {
  const { user } = useContext(authContext);

  const [customerlist, setCustomerlist] = useState({
    accountNumber: "",
    accountType: "",
    balance: "",
  });

  useEffect(() => {
    if (!user) return;

    async function fetchAccounts() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/admin/getAccountsByEmail/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setCustomerlist(response.data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    }

    fetchAccounts();
  }, [user]);

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <div className="w-64 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-md font-semibold mb-3">Account Details</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Account No</span>
              <span>{customerlist.accountNumber}</span>
            </div>

            <div className="flex justify-between">
              <span>Type</span>
              <span>{customerlist.accountType}</span>
            </div>

            <div className="flex justify-between">
              <span>Balance</span>
              <span className="text-green-600">
                ₹ {customerlist.balance}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
