import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth(); // Get login function from AuthContext

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      // Store JWT token in localStorage
      // localStorage.setItem("token", response.data.token);

      login(response.data.token); // Call login function from AuthContext to update user state
      // setIsLoggedIn(true); // Update state to remove links from header

      alert("Login successful!");
      // navigate("/chat"); // Redirect to Chat.jsx

      // Delay navigation slightly to ensure token storage completes
      setTimeout(() => {
        navigate("/chat"); // Redirect to Chat.jsx
      }, 200);
      // navigate("/dashboard"); // Redirect to a protected page (replace with your route)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;



// import { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext"; // Import AuthContext

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState("");
//   const { login } = useAuth(); // Get login function

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", formData);
//       login(response.data.token); // Call login() function from AuthContext
//       alert("Login successful!");
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
//         <form onSubmit={handleSubmit}>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
//           <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

