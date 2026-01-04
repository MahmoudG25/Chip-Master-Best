import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  isLoading, 
  disabled, 
  icon: Icon,
  iconPosition = 'start',
  ...props 
}) => {
  const variants = {
    primary: 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700',
    outline: 'border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900',
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
    danger: 'bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
    xl: 'px-10 py-4 text-lg font-bold',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      className={twMerge(
        'relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <span className={clsx('flex items-center gap-2', isLoading && 'opacity-0')}>
        {Icon && iconPosition === 'start' && <Icon size={18} />}
        {children}
        {Icon && iconPosition === 'end' && <Icon size={18} />}
      </span>
    </motion.button>
  );
};
