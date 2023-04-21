import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ loggedInUser, onLogIn }) => {
  const [loginCredentials, setLoginCredentials] = useState({
    userOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      });

      const result = await response.json();

      if (response.ok) {
        //store the jwt token sent by server in the local storage
        localStorage.setItem("token",result.accessToken);
        // reset the form
        setLoginCredentials({userOrEmail:"", password:""});
        // modify the loggedInUser state
        onLogIn(result.user);
        toast.success("Logged In Successfully");
      }

      else {
        toast.error(result.error);
      }
        
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      {!loggedInUser && (
        <div className="flex h-screen justify-center items-center bg-gray-100">
          <div className=" w-full max-w-md bg-white p-8 rounded-md shadow-md ">
            <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="user-email"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Enter username or email
                </label>
                <input
                  type="text"
                  id="user-email"
                  name="userOrEmail"
                  value={loginCredentials.userOrEmail}
                  onChange={handleChange}
                  placeholder="name or name@something.com"
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
                  value={loginCredentials.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
              >
                Login
              </button>
            </form>
            <p className="text-sm font-medium mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="underline text-indigo-500">
                {" "}
                Create one{" "}
              </Link>{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
