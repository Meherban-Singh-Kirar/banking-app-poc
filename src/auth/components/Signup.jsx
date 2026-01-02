import { useState } from "react";
import Header from "../../shared/components/Header";
import axios from "axios";

function Signup() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const{name,value}=e.target;
    setRegisterForm((prev)=>({
      ...prev,
      [name]:name==="role"? value.toUpperCase():value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if user already exists.
    const check = axios.get(
      `http://localhost:3001/users?email=${registerForm.email}`
    );
    const existing = (await check).data;

    if (existing.length > 0) {
      alert("User already exists");
      return;
    }
    // save user in db.json
    try {
      const result = await axios.post(
        "http://localhost:3001/users",
        registerForm
      );
      if (result.status === 201) {
        alert("user saved successfully");
      }
    } catch (erroe) {
      console.error("Error while registring");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Registration
          </h2>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={registerForm.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={registerForm.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={registerForm.role}
              onChange={handleChange}
              placeholder="Enter role"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
