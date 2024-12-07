import React, {  useState } from "react";
import { post } from "../state/api/Axios";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-hot-toast";
import { useDispatch} from "react-redux";
import { fetchUser } from "../state/AuthSlice";



export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !formData.password) {
      return toast.error("All fields are required.");
    }
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address.");
    }

    setLoading(true);
    try {     
      
      const data = await post(`/auth/Login`, { email: formData.email, password: formData.password }); // loginUser(});
      if(data.data.sucusss){
        toast.success(data.data.message);
        dispatch(fetchUser(data.data.user));
        if(data.data.user.role === "admin"){
          navigate("/admin");
        }else{
          navigate("/");
        }
      } else{
        toast.error(data.data.message);
      }         
      
    } catch (err) {      
      console.error("Login error:", err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?
            <Link to="/request" className="text-blue-600 hover:underline ml-2">
              Request
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
