import { useState } from "react";
import Header from "../../shared/components/Header";
import axios from "axios";

function Signup() {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    role: "CLERK",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/registration/signup",
        registerForm
      );

      if (response.status === 201) {
        alert("Staff registered successfully");
        setRegisterForm({
          name: "",
          email: "",
          password: "",
          dob: "",
          role: "CLERK",
        });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert("User already exists");
      } else {
        alert("Registration failed");
      }
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
            Staff Registration
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={registerForm.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="date"
            name="dob"
            value={registerForm.dob}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          {/* Role Dropdown */}
          <select
            name="role"
            value={registerForm.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="CLERK">Clerk</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
