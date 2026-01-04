import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = ({ 
  label, 
  error, 
  className, 
  icon: Icon,
  ...props 
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ms-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          className={twMerge(
            'w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm outline-none transition-all',
            'focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600',
            'placeholder:text-slate-400 dark:placeholder:text-slate-600',
            Icon && 'ps-11',
            error && 'border-red-500 focus:ring-red-500/10 focus:border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[10px] font-medium text-red-500 ms-1">
          {error}
        </span>
      )}
    </div>
  );
};
