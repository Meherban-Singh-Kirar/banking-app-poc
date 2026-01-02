import { useState, useEffect } from "react";
import axios from "axios";

function TransactionHistory() {
  const [tranHist, setTranHist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/transactions")
      .then((res) => setTranHist(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">To User</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {tranHist.length > 0 ? (
              tranHist.map((trans) => (
                <tr key={trans.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{trans.toUserId}</td>
                  <td className="px-4 py-2 font-medium text-green-600">
                    ₹{trans.amount}
                  </td>
                  <td className="px-4 py-2">{trans.date}</td>
                  <td className="px-4 py-2 text-gray-600">{trans.desc}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
