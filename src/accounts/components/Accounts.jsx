import { useState } from "react";
import Header from "../../shared/components/Header";
import axios from "axios";

function Accounts() {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    balance: "",
    accountType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/createAccount",
        account,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Customer account created successfully");
        setAccount({
          name: "",
          email: "",
          dob: "",
          phone: "",
          balance: "",
          accountType: "",
        });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert("Account already exists");
      } else {
        alert("Account creation failed");
      }
    }
  };

  return (
    <>
      <Header />

      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Create Customer Account
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={account.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Customer Email"
            value={account.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Customer Password"
            value={account.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="date"
            name="dob"
            value={account.dob}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={account.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            name="balance"
            placeholder="Initial Balance"
            value={account.balance}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          {/* Account Type */}
          <div className="flex gap-10">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accountType"
                value="SAVING"
                checked={account.accountType === "SAVING"}
                onChange={handleChange}
                required
              />
              Saving
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accountType"
                value="CURRENT"
                checked={account.accountType === "CURRENT"}
                onChange={handleChange}
              />
              Current
            </label>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}

export default Accounts;
