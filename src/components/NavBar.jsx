import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Button from './Button';
import { CiLogin } from "react-icons/ci";
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
      <div className="w-[80%] mx-auto flex items-center justify-between px-6 py-3 md:py-4 shadow rounded-full bg-white dark:bg-slate-800 relative transition-colors">
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
          items-center justify-center max-md:h-screen transition-[width] duration-300 bg-white/95 dark:bg-slate-800/95 backdrop-blur 
          flex-col md:flex-row flex gap-8 text-gray-900 dark:text-gray-100 text-sm font-normal z-50
          ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}
        `}
      >
        <Link 
          to="/" 
          onClick={closeMenu}
          className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive('/') ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''}`}
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
          className="md:hidden text-gray-600 dark:text-gray-400 absolute top-6 right-6 hover:text-gray-900 dark:hover:text-gray-100 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="size-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 transition border border-slate-300 dark:border-slate-600 rounded-md"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon size={15} className="text-slate-700 dark:text-slate-300" />
          ) : (
            <Sun size={15} className="text-slate-300" />
          )}
        </button>
        <Link 
          to="/auth/login" 
          onClick={closeMenu}
          className={`hidden md:flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive('/auth/login') ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''}`}
        >
          <CiLogin /> Login
        </Link>
        {/* Sign up Link */}
        <Link 
          to="/auth/register" 
          onClick={closeMenu}
          className={`hidden md:flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition ${isActive('/auth/register') ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''}`}
        >
            <Button gradientColor="#22C55E">Sign up</Button>
        </Link>

        {/* Open Menu Button (Mobile only) */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
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