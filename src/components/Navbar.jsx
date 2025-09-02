import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for hamburger & close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-6 shadow-md bg-white">
      <section className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold font-serif text-gray-800">
          <Link to="/">Verdict AI</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex items-center space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>

          </div>
          <div className="flex items-center space-x-6">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create an account
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </section>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-gray-700 font-medium">
          <Link to="/" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>

          <hr />
          <Link 
            to="/login" 
            className="block px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
          <Link 
            to="/signup" 
            className="block px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Create an account
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
