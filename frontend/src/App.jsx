// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* Include Header Component */}
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
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
