import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Badge = ({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  className 
}) => {
  const variants = {
    neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    primary: 'bg-indigo-600/10 text-indigo-600 border border-indigo-600/20',
    success: 'bg-green-500/10 text-green-500 border border-green-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
    danger: 'bg-red-500/10 text-red-500 border border-red-500/20',
    info: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-3 py-1 text-[10px]',
  };

  return (
    <span className={twMerge(
      'inline-flex items-center font-black uppercase tracking-widest rounded-full',
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
};
