import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-xl font-bold">Verdict AI</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="hover:text-gray-200 transition px-3 py-1 rounded bg-blue-600"
            >
              Profile
            </button>

            {profileOpen && (
              <div className="absolute top-16 right-4 bg-white text-black rounded-lg shadow-lg p-4 w-56 z-50">
                <p className="font-semibold mb-2">{user.name}</p>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-blue-700">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="block w-full text-left hover:text-gray-200 transition px-3 py-1 rounded bg-blue-600"
          >
            Profile
          </button>

          {profileOpen && (
            <div className="bg-white text-black rounded-lg shadow-lg p-4 mt-2">
              <p className="font-semibold mb-2">{user.name}</p>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default PrivateNavbar;
