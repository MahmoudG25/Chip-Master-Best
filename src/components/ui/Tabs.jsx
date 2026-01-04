import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const Tabs = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={twMerge('flex p-1.5 bg-slate-100 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={twMerge(
            'flex-1 relative py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300',
            activeTab === tab.id ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 dark:border-slate-800"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {tab.icon && <tab.icon size={14} />}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};
