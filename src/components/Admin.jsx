import React, { useEffect, useState } from "react";
import { get, patch, post } from "../state/api/Axios";
import { toast } from "react-hot-toast";
import Usertable from "./Usertable";
import Admintable from "./Admintable";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alladmins, allusers } from "../state/AuthSlice";

function Admin() {
  const dispatch = useDispatch();
  const [isUserTable, setIsUserTable] = useState(true);
  const [users, setUsers] = useState([]);
  const [admin, setadmin] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const toggleSwitch = () => {
    setIsUserTable(!isUserTable);
  };
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.allusers);
  const admins = useSelector((state) => state.auth.alladmins);
  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("/admin/getuser");
        const adminresponse = await get("/admin/getadmin");
        dispatch(allusers(response.data));
        dispatch(alladmins(adminresponse.data));
        setUsers(user);
        setadmin(admins);        
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []); // Run only once on component mount

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true); // Set loading to true

    try {
      const response = await post("/admin/createuser", formData);

      if (response.status === 200) {
        // Update state
        if (response.data.user.role === "admin") {
          setadmin((prevadmin) => [...prevadmin, response.data.user]);
        } else {
          setUsers((prevUsers) => [...prevUsers, response.data.user]);
        }

        toast.success("User created successfully!");

        // Reset form fields
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "user",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating user!");
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  const switchtoadmin = async (id) => {
    try {
      const response = await patch(`/admin/updateadmin/${id}`, {
        role: "admin",
      });
      if (response.status === 200) {
        setadmin((prevadmin) => [...prevadmin, response.data.user]);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        toast.success("Switched to admin successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error switching user!");
    }
  };
  const switchadmin = async (id) => {
    //  console.log(admin[0]._id)
    try {
      const response = await patch(`/admin/updateadmin/${id}`, {
        role: "user",
      });
      if (response.status === 200) {
        setadmin((prevadmin) => prevadmin.filter((user) => user._id !== id));
        setUsers((prevUsers) => [...prevUsers, response.data.user]);
        toast.success("Switched to user successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error switching user!");
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Form to create a new user */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter user name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter user email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter user password"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create User
          </button>
        </div>
      </form>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Change table</h1>

        {/* Toggle Switch */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-gray-700 font-medium">
            {isUserTable ? "User Table" : "Admin Table"}
          </span>
          <button
            onClick={toggleSwitch}
            className={`relative inline-flex h-6 w-12 rounded-full focus:outline-none transition-colors duration-300 ${
              isUserTable ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transition-transform transform ${
                isUserTable ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Conditional Rendering of Tables */}
        <div>
          {isUserTable ? (
            <Usertable
              users={users}
              switchtoadmin={switchtoadmin}
              setUsers={setUsers}
            />
          ) : (
            <Admintable admin={admin} switchadmin={switchadmin} />
          )}
        </div>
        <div>
          <br />
          <hr />
          <br />
          <Link to ="/RequestUser" className="bg-blue-500 hover:bg-blue-700 text-white mx-2 font-bold py-2 px-4 rounded" > Request table</Link>
        </div>
      </div>

      {/* Conditional Rendering of Tables */}
    </div>
  );
}

export default Admin;
