import axios from "axios";
import { useEffect, useState } from "react";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/getAllAccounts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer List</h2>

      {customers.length === 0 && <p>No customers found</p>}

      {customers.map((customer) => (
        <div key={customer.id} className="border p-3 mb-3 rounded shadow">
          <p>
            <b>Name:</b> {customer.name}
          </p>
          <p>
            <b>Balance:</b> ₹{customer.balance}
          </p>
          <p>
            <b>Account Type:</b> {customer.accountType}
          </p>
          <p>
            <b>Account Number:</b> {customer.accountNumber}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ManageCustomers;
