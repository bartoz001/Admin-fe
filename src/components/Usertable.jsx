import React, { useEffect, useState } from "react";
import { del, get } from "../state/api/Axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { dletecurrentuser } from "../state/AuthSlice";

function Usertable(props) {
  const dispatch = useDispatch();
const {users, setUsers ,switchtoadmin} = props;
  const deleteUser = async (id) => {
    try {
      const response = await del(`/admin/deleteuser/${id}`);
      if (response.status === 200) {
        dispatch(dletecurrentuser(id))
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200">User</th>
              <th className="px-4 py-2 border-b border-gray-200">Email</th>
              <th className="px-4 py-2 border-b border-gray-200">Move to Admin</th>
              <th className="px-4 py-2 border-b border-gray-200">Delete</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.email}
                </td>
                <td className="px-4 py-2 border-b border-gray-200" >
                 <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => switchtoadmin(user._id)}>Move</button>
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usertable;
