import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Cpu } from 'lucide-react';
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
      <div className="w-[95%] md:w-[80%] mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4 shadow rounded-2xl md:rounded-full bg-white dark:bg-slate-800 relative transition-colors mt-2 md:mt-0">
      {/* Logo */}
      <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
        <div className="p-2 bg-indigo-600 rounded-xl group-hover:bg-indigo-700 transition-colors">
            <Cpu className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-500 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Chip Master
        </span>
      </Link>

      {/* Navigation Menu */}
      <nav 
        className={`
          items-center justify-center max-md:h-screen transition-[width] duration-300 bg-white/95 dark:bg-slate-800/95 backdrop-blur 
          flex-col md:flex-row flex gap-8 text-gray-900 dark:text-gray-100 text-sm font-normal z-50
          md:flex hidden
        `}>
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


        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
            onClick={toggleMenu}
            aria-label="Toggle menu"
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu Overlay */}
    {isOpen && (
      <div className="md:hidden absolute top0 right-5 z-50 mt-2 w-64 origin-top-right">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-100 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden p-2 flex flex-col gap-1">
          {['Home', 'Services', 'About', 'Order', 'Contact'].map((item) => {
             const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace('services', 'serves')}`;
             return (
              <Link 
                key={item}
                to={path} 
                onClick={closeMenu}
                className={`
                  p-4 rounded-xl text-center font-medium text-base transition-colors
                  ${isActive(path) 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }
                `}
              >
                {item}
              </Link>
             );
          })}
           <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4" />
           <div className="grid grid-cols-2 gap-2 p-2">
            <Link 
              to="/auth/login" 
              onClick={closeMenu}
              className="flex items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
            >
              Login
            </Link>
            <Link 
              to="/auth/register" 
              onClick={closeMenu}
            >
               <Button className="w-full justify-center" gradientColor="#22C55E">Sign up</Button>
            </Link>
           </div>
        </div>
      </div>
    )}
    </nav>
  );
};

export default Navbar;