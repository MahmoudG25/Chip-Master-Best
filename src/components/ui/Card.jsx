import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, padding = 'lg' }) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={twMerge(
      'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden',
      paddings[padding],
      className
    )}>
      {children}
    </div>
  );
};
