import { del, get, post } from "../state/api/Axios";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { adduser, status } from "../state/AuthSlice";

function RequestTable() {
  const [users, setUsers] = React.useState([]);
  const allusers = useSelector((state) => state.auth.allusers);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = async () => {
      try {
        const response = await get("/admin/getrequest");

        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    user();
  }, []);
  if (users.length === 0) {
    return (
      <div className="text-center mt-5 font-bold text-2xl">
        No Reuested Users yet
      </div>
    );
  }
  const Move = async (id) => {
    try {
      const response = await post(`/admin/acceptrequest/${id}`);

      if (response.status === 200) {
        dispatch(adduser(response.data.user));
        console.log(response.data.user);
        console.log(allusers);
        dispatch(
          status(
            "Success",
            "Your password is and you can change it after login. Temporary Password is :",
            response.data.temporaryPassword
          )
        );
        console.log(response.data.temporaryPassword);
        toast.success("Request Accepted");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await del(`/admin/deleterequest/${id}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Request Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200">User</th>
              <th className="px-4 py-2 border-b border-gray-200">Email</th>
              <th className="px-4 py-2 border-b border-gray-200">Move</th>
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
                <td className="px-4 py-2 border-b border-gray-200">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => Move(user._id)}
                  >
                    Move
                  </button>
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

export default RequestTable;
