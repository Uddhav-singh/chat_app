// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <header className="bg-green-600 text-white py-4 px-6 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Left - App Name */}
//         <h1 className="text-2xl font-bold">Chat App</h1>

//         {/* Right - Navigation Links */}
//         <nav>
//           <ul className="flex space-x-6">
//             <li>
//               <Link to="/signup" className="hover:underline">Sign Up</Link>
//             </li>
//             <li>
//               <Link to="/login" className="hover:underline">Login</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user has a JWT token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Update state to hide links
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Chat App</h1>
      <nav>
        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="mr-4">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
