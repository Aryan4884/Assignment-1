import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://reqres.in"; // Define the base URL

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Frontend validation for correct credentials
    if (email !== "eve.holt@reqres.in" || password !== "cityslicka") {
      setError("Invalid email or password! Please try again.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/users"); // Redirect only if token exists
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input 
            type="email" 
            className="w-full p-3 border border-gray-300 rounded" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input 
            type="password" 
            className="w-full p-3 border border-gray-300 rounded" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
