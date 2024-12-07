import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { post } from "../state/api/Axios";
import { toast } from "react-hot-toast";
import { logout } from "../state/AuthSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleonLogout = async () => {
    try {
      const response = await post("/auth/logout");
      if (response.data.sucusss) {
        toast.success(response.data.message);
        dispatch(logout());
        navigate("/login");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        {/* Welcome Message */}
        <div className="text-3xl font-extrabold text-gray-800 mb-8">
          Welcome, <span className="text-blue-600">{user.name}</span>
        </div>

        {/* User Details */}
        <div className="text-gray-700 space-y-3 mb-8">
          <div className="text-lg font-semibold">
            <span className="text-gray-500">Email:</span> {user.email}
          </div>
          <div className="text-lg font-semibold">
            <span className="text-gray-500">Role:</span> {user.role}
          </div>
          <div className="text-lg font-semibold">
            <span className="text-gray-500">User ID:</span> {user._id}
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 mb-4"
          onClick={handleonLogout}
        >
          Logout
        </button>

        {/* Admin Button */}
        {user.role === "admin" && (
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mb-4"
            onClick={() => navigate("/admin")}
          >
            Go to Admin
          </button>
        )}

        {/* Edit Profile Link */}
        <Link
          to="/profile"
          className="w-full block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Edit Profile
        </Link>
      </section>
    </div>
  );
}

export default Home;
