import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full">
      <div className="w-[80%] mx-auto flex items-center justify-between px-6 py-3 md:py-4 shadow rounded-full bg-white relative">
      {/* Logo */}
      <Link to="/" onClick={closeMenu}>
        <img 
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiDummyLogo.svg" 
          alt="Logo"
        />
      </Link>

      {/* Navigation Menu */}
      <nav 
        className={`
          max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden 
          items-center justify-center max-md:h-screen transition-[width] duration-300 bg-white/95 backdrop-blur 
          flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-normal z-50
          ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}
        `}
      >
        <Link 
          to="/" 
          onClick={closeMenu}
          className={`hover:text-indigo-600 transition ${isActive('/') ? 'text-indigo-600 font-semibold' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/serves" 
          onClick={closeMenu}
          className={`hover:text-indigo-600 transition ${isActive('/serves') ? 'text-indigo-600 font-semibold' : ''}`}
        >
          Services
        </Link>
        <Link 
          to="/about" 
          onClick={closeMenu}
          className={`hover:text-indigo-600 transition ${isActive('/about') ? 'text-indigo-600 font-semibold' : ''}`}
        >
          About
        </Link>
        <Link 
          to="/order" 
          onClick={closeMenu}
          className={`hover:text-indigo-600 transition ${isActive('/order') ? 'text-indigo-600 font-semibold' : ''}`}
        >
          Order
        </Link>
        <Link 
          to="/contact" 
          onClick={closeMenu}
          className={`hover:text-indigo-600 transition ${isActive('/contact') ? 'text-indigo-600 font-semibold' : ''}`}
        >
          Contact
        </Link>

        {/* Close Button (Mobile only) */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-600 absolute top-6 right-6"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        {/* Theme/Settings Button */}
        <button className="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
              stroke="#353535" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
            />
          </svg>
        </button>
        <Link 
          to="/auth/login" 
          onClick={closeMenu}
          className="hidden md:flex items-center gap-2 hover:text-indigo-600 transition ${isActive('/auth/login') ? 'text-indigo-600 font-semibold' : ''}"
        >
          <CiLogin /> Login
        </Link>
        {/* Sign up Link */}
        <Link 
          to="/auth/register" 
          onClick={closeMenu}
          className="hidden md:flex items-center gap-2 hover:text-indigo-600 transition ${isActive('/auth/register') ? 'text-indigo-600 font-semibold' : ''}"
        >
            <Button gradientColor="#22C55E">Sign up</Button>
        </Link>

        {/* Open Menu Button (Mobile only) */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;