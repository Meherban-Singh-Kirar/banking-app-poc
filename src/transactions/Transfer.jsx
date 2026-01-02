import { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../auth/components/AuthContextAPI";

function Transfer() {
  const { user } = useContext(authContext);
  const [form, setForm] = useState({
    toUserId: "",
    amount: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = Number(form.amount);

    if (amount <= 0) {
      alert("Amount must be greater than zero");
      return;
    }

    try {
      setLoading(true);

      // Get sender
      const senderRes = await axios.get(`http://localhost:3001/users/${user.id}`);
      const sender = senderRes.data;

      if (sender.balance < amount) {
        alert("Insufficient balance");
        return;
      }

      // Get receiver
      const receiverRes = await axios.get(
        `http://localhost:3001/users/${form.toUserId}`
      );
      const receiver = receiverRes.data;

      // Update balances
      await axios.patch(`http://localhost:3001/users/${sender.id}`, {
        balance: sender.balance - amount
      });

      await axios.patch(`http://localhost:3001/users/${receiver.id}`, {
        balance: receiver.balance + amount
      });

      // Save transaction
      await axios.post("http://localhost:3001/transactions", {
        fromUserId: sender.id,
        toUserId: receiver.id,
        amount,
        date: new Date().toISOString().split("T")[0],
        desc: "Money Transfer"
      });

      alert("Transfer successful");
      setForm({ toUserId: "", amount: "" });

    } catch (error) {
      alert("Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Transfer Money</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">To User ID</label>
          <input
            type="number"
            name="toUserId"
            value={form.toUserId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Transfer"}
        </button>
      </form>
    </div>
  );
}

export default Transfer;
