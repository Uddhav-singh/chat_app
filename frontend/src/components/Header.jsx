// // import { Link } from "react-router-dom";
// // import { useEffect, useState } from "react";

// // const Header = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   useEffect(() => {
// //     // Check if user has a JWT token in localStorage
// //     const token = localStorage.getItem("token");
// //     setIsLoggedIn(!!token); // Convert to boolean
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); // Remove token
// //     setIsLoggedIn(false); // Update state to hide links
// //   };

// //   return (
// //     <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
// //       <h1 className="text-2xl font-bold">Chat App</h1>
// //       <nav>
// //         {!isLoggedIn ? (
// //           <>
// //             <Link to="/signup" className="mr-4">Sign Up</Link>
// //             <Link to="/login">Login</Link>
// //           </>
// //         ) : (
// //           <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
// //             Logout
// //           </button>
// //         )}
// //       </nav>
// //     </header>
// //   );
// // };

// // export default Header;


// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // Check login status when component mounts
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token); // Convert token to boolean (true/false)
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove JWT token
//     setIsLoggedIn(false); // Update state to reflect logout
//     window.location.onload(); // Refresh to reflect changes
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold">Chat App</h1>
//       <nav>
//         {isLoggedIn ? (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link to="/signup" className="mr-4 hover:underline">
//               Sign Up
//             </Link>
//             <Link to="/login" className="hover:underline">
//               Login
//             </Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;


import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const Header = () => {
  const { user, logout } = useAuth(); // Get user data and logout function

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Chat App</h1>
      <nav>
        {user ? (
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user.email}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/signup" className="mr-4 hover:underline">Sign Up</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

