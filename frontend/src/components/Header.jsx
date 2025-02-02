import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-green-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - App Name */}
        <h1 className="text-2xl font-bold">Chat App</h1>

        {/* Right - Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
