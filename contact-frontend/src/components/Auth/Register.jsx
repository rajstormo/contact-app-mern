import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate data before sending
    if (registerData.password !== registerData.confirmPassword)
      return toast.error("Password doesn't match!");

    try {
      const data = { ...registerData, confirmPassword: null };
      const response = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.success);
        // after registering, navigate to the login route
        navigate("/login", { replace: true });
      } else toast.error(result.error);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Register an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerData.username}
              onChange={handleChange}
              placeholder="rajstormo"
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={registerData.confirmPassword}
              required
              placeholder="********"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-sm font-medium mt-6">
          Already have an account?{" "}
          <Link to="/login" className="underline text-indigo-500">
            {" "}
            Login{" "}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
