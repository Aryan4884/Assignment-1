import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNumber) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      alert("User deleted successfully! (Note: API does not persist deletions)");
      setUsers(users.filter(user => user.id !== id)); // Remove from local state
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div className="w-full p-8">
        <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">Users List</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border-collapse border shadow-md">
            <thead>
              <tr className="bg-gray-300">
                <th className="border p-3 text-black">Avatar</th>
                <th className="border p-3 text-black">Name</th>
                <th className="border p-3 text-black">Email</th>
                <th className="border p-3 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="text-center hover:bg-gray-100 transition">
                  <td className="border p-2">
                    <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full mx-auto" />
                  </td>
                  <td className="border p-2 text-black">{user.first_name} {user.last_name}</td>
                  <td className="border p-2 text-black">{user.email}</td>
                  <td className="border p-2">
                    <button onClick={() => navigate(`/edit/${user.id}`)} className="bg-yellow-500 px-4 py-1 text-white rounded mr-2 hover:bg-yellow-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="bg-red-500 px-4 py-1 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)} 
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Previous
          </button>
          
          <span className="text-gray-800 text-lg">Page {page} of {totalPages}</span>
          
          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(page + 1)} 
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
