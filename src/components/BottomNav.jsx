import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Camera, ShoppingBag, User, Phone, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();
  
  // Hide bottom nav on specific routes if needed (e.g., inside the full-screen camera view)
  // For now, we show it everywhere for consistency, or we can hide it if needed.
  
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/order", icon: ShoppingBag, label: "Order" },
    { to: "/serves", icon: Camera, label: "Scan", isFloating: true },
    { to: "/contact", icon: Phone, label: "Contact" },
    { to: "/auth/login", icon: User, label: "Profile" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 pt-0 pointer-events-none">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl shadow-indigo-500/10 rounded-[2rem] flex items-center justify-around p-2 pointer-events-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300
              ${item.isFloating 
                ? 'mb-8 -mt-8 bg-indigo-600 shadow-lg shadow-indigo-600/40 text-white scale-110' 
                : isActive 
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }
            `}
          >
             {({ isActive }) => (
                <>
                  <item.icon size={item.isFloating ? 28 : 24} strokeWidth={isActive || item.isFloating ? 2.5 : 2} />
                  {!item.isFloating && isActive && (
                    <motion.div
                      layoutId="bottomNavDot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400"
                    />
                  )}
                </>
             )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
