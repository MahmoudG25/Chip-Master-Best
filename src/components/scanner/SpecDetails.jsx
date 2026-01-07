import React from 'react';
import { Card } from '../ui/Card'; // Adjusted path
import { Badge } from '../ui/Badge'; // Adjusted path
import { Button } from '../ui/Button'; // Adjusted path
import { Cpu, ExternalLink, RefreshCcw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const SpecDetails = ({ result, onReset }) => {
  const { lang } = useLanguage();
  
  if (!result) return null;

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center">
        <Badge variant="primary" className="mb-4">
          {result.source || (lang === 'ar' ? 'نتائج القاعدة' : 'Database Results')}
        </Badge>
        
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] mb-2">
          {result.code}
        </span>
        
        <h2 className="text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
          {result.sizeDisplay}
        </h2>

        <div className="w-full space-y-4">
          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
            <p className="text-xl font-bold leading-relaxed text-slate-800 dark:text-slate-200">
              {result.description}
            </p>
            <Badge variant="neutral" className="mt-4">
              {result.brand}
            </Badge>
          </div>

          {result.techDetails && (
            <div className="grid grid-cols-2 gap-3 text-start">
              <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                  {lang === 'ar' ? 'النوع' : 'Type'}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {result.techDetails.type}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                  {lang === 'ar' ? 'السرعة' : 'Speed'}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {result.techDetails.speed}
                </span>
              </div>
            </div>
          )}

          {result.sources && result.sources.length > 0 && (
            <div className="pt-4 text-start">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-3">
                {lang === 'ar' ? 'المصادر المرجعية' : 'Reference Sources'}
              </span>
              <div className="flex flex-wrap gap-2">
                {result.sources.map((s, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="sm" 
                    className="rounded-lg text-[10px] h-auto py-1.5"
                    onClick={() => window.open(s.uri, '_blank')}
                  >
                    <ExternalLink size={12} className="me-2" />
                    {s.title}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button 
          variant="secondary" 
          className="mt-8 w-full rounded-2xl py-4" 
          onClick={onReset}
          icon={RefreshCcw}
        >
          {lang === 'ar' ? 'بحث جديد' : 'New Search'}
        </Button>
      </div>
    </Card>
  );
};
