import React from "react";

function Admintable(props) {
  const { admin,switchadmin } = props;
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200">Admins</th>
              <th className="px-4 py-2 border-b border-gray-200">Email</th>
              <th className="px-4 py-2 border-b border-gray-200">Role</th>
              <th className="px-4 py-2 border-b border-gray-200">Move to User</th>

            </tr>
          </thead>
          <tbody>
            {admin.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.email}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.role}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <button onClick={() => switchadmin(user._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Move
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

export default Admintable;
