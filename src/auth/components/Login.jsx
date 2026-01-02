import { useState, useContext } from "react";
import Header from "../../shared/components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "./AuthContextAPI";

function Login() {
  const { login } = useContext(authContext);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.get(
        `http://localhost:3001/users?email=${loginForm.email}&password=${loginForm.password}`
      );

      if (loginRes.data.length === 0) {
        alert("Invalid email or password");
        return;
      }
      const user = loginRes.data[0];

      login(user.token, user.role,user);
      if (user.role === "CUSTOMER") {
        navigate("/customerDashboard");
      } else if(user.role==="ADMIN") {
        navigate("/adminDashboard");
      }
    } catch (error) {
      console.error("Error while login in");
      alert("Somethign went wrong");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Login
          </h2>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
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
              value={loginForm.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
