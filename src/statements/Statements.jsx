import axios from "axios";
import { useState } from "react";

function Statements() {
  // Form state
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
  });

  // Transactions state
  const [transactions, setTransactions] = useState([]);

  // Loading & error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch statement
  const handleStatement = async () => {
    if (!form.fromDate || !form.toDate) {
      setError("Please select both dates");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const statementResp = await axios.get(
        `http://localhost:3001/transactions`
      );
      const filtered = statementResp.data.filter(
        (tx) => tx.date >= form.fromDate && tx.date <= form.toDate
      );
      setTransactions(filtered);
    } catch (error) {
      console.log("Error while fetching the transaction record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            From Date:
          </label>
          <input
            type="date"
            name="fromDate"
            value={form.fromDate}
            onChange={handleChange}
            className="border px-3 py-1.5 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* To Date */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            To Date:
          </label>
          <input
            type="date"
            name="toDate"
            value={form.toDate}
            onChange={handleChange}
            className="border px-3 py-1.5 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleStatement}
          className="bg-blue-600 text-white px-4 py-1.5 h-9 text-sm rounded-md
               hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Loading */}
      {loading && <p className="mt-4 text-gray-600">Loading...</p>}

      {/* Transactions Table */}
      {!loading && transactions.length > 0 && (
        <div className="mt-6 bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">From</th>
                <th className="px-4 py-2 text-left">To</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{tx.date}</td>
                  <td className="px-4 py-2">{tx.fromUserId}</td>
                  <td className="px-4 py-2">{tx.toUserId}</td>
                  <td className="px-4 py-2 text-green-600 font-medium">
                    ₹{tx.amount}
                  </td>
                  <td className="px-4 py-2">{tx.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Statements;
