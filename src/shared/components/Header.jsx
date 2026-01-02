import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../auth/components/AuthContextAPI";

function Header() {
  const { isAuthenticate, logout } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <header className="bg-blue-700 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center">
        {/* Center Title */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
           Digital Banking System
        </h1>
        <nav className="ml-auto space-x-6">
          {/* Navigation */}
          {!isAuthenticate && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signUp">Sign Up</Link>
            </>
          )}
          {isAuthenticate && <button onClick={handleLogout}>Logout</button>}
        </nav>
      </div>
    </header>
  );
}

export default Header;
