import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const { id } = useParams(); // Get user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", avatar: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(res => {
        if (res.data.data) {
          setUser({
            first_name: res.data.data.first_name,
            last_name: res.data.data.last_name,
            email: res.data.data.email,
            avatar: res.data.data.avatar,
          });
        }
      })
      .catch(err => console.error("Error fetching user data:", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });

      alert("User updated successfully! (Note: API does not persist changes)");
      navigate("/users"); // Redirect back to users list
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">Edit User</h1>
        <div className="flex justify-center mb-4">
          {user.avatar && <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full shadow-md" />}
        </div>
        <form onSubmit={handleUpdate}>
          <input 
            type="text" 
            value={user.first_name} 
            onChange={(e) => setUser({ ...user, first_name: e.target.value })} 
            className="w-full p-3 border border-gray-300 rounded mb-3" 
            placeholder="First Name" 
            required 
          />
          <input 
            type="text" 
            value={user.last_name} 
            onChange={(e) => setUser({ ...user, last_name: e.target.value })} 
            className="w-full p-3 border border-gray-300 rounded mb-3" 
            placeholder="Last Name" 
            required 
          />
          <input 
            type="email" 
            value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
            className="w-full p-3 border border-gray-300 rounded mb-3" 
            placeholder="Email" 
            required 
          />
          <button type="submit" className="bg-green-500 text-white p-3 w-full rounded-lg hover:bg-green-600">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
