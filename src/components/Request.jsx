import React, { useState } from "react";
import { post } from "../state/api/Axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { status } from "../state/AuthSlice";

function Request() {
  const dispatch = useDispatch();
  const currentstatus = useSelector((state) => state.auth.status);
  //   const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !formData.name) {
      return toast.error("All fields are required.");
    }
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address.");
    }

    try {
      const data = await post(`/auth/requestuser`, formData); // loginUser(});
      if (data.status === 201) {
        dispatch(status("Pending"));
        setLoading(true);
        toast.success(data.data.message);
      } else {
        toast.error(data.data.message);
      }

      setFormData({ name: "", email: "" });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
    }
  };

  return (
    <>
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
        <section className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Request Access
          </h2>

          {/* Placeholder for Error Message */}
          {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}

          <form onSubmit={handleLogin}>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleOnChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400 transition"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleOnChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400 transition"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 mb-4"
              onClick={handleLogin}
            >
              Submit
            </button>

            {/* Login Redirect */}
            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </form>
          {loading && (
            <div className="text-center mt-4 text-gray-700 text-lg">
              Status:{" "}
              <span className="font-medium text-blue-600">{currentstatus}</span>
            </div>
          )}
        </section>

        {/* Status Message */}
      </main>
    </>
  );
}

export default Request;
