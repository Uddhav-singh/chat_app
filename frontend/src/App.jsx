// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Import AuthContext
import Header from "./components/Header";
import "./App.css";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import CreateGroupModal from "./pages/CreateGroupModal";


const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();

   if (loading) return <div>Loading...</div>; // Show loading until auth is ready
  
  return user ? element : <Navigate to="/login" />;
};

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* Include Header Component */}
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
        <Route path="/create-group" element={<ProtectedRoute element={<CreateGroupModal />} />} />
        {/* Add more routes as needed */}
      </Routes>
      {/* <SignUp /> */}

      {/* Main Content */}
      {/* <main className="container mx-auto mt-10 text-center">
        <h1 className="text-4xl font-bold">Welcome to Vite + React</h1>
      </main> */}
    </>
  );
}

export default App;
