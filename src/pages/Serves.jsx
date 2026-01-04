import React from 'react';
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';
import { Search, Camera, Globe, ShoppingCart, MessageCircle, HelpCircle } from 'lucide-react';
import { useChipSearch } from '../hooks/useChipSearch';
import { useScanner } from '../hooks/useScanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useDatabase } from '../contexts/DatabaseContext';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { ScannerModule } from '../components/neural/ScannerModule';
import { SpecDetails } from '../components/neural/SpecDetails';

const Serves = () => {
  const { lang, toggleLanguage } = useLanguage();
  const { appConfig } = useDatabase();
  const {
    inputCode,
    setInputCode,
    searchTab,
    setSearchTab,
    matches,
    lastResult,
    isSearching,
    handleNeuralSearch,
    selectMatch,
    resetSearch
  } = useChipSearch();

  const {
    isScannerOpen,
    isProcessing,
    videoRef,
    canvasRef,
    startCamera,
    closeCamera,
    captureImage
  } = useScanner();

  const handleCapture = async () => {
    try {
      const code = await captureImage();
      if (code) {
        setInputCode(code);
        closeCamera();
      } else {
        alert(lang === 'ar' ? 'لم يتم اكتشاف كود' : 'No code detected');
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const tabs = [
    { id: 'local', label: lang === 'ar' ? 'القاعدة المحلية' : 'Local Database' },
    { id: 'neural', label: lang === 'ar' ? 'البحث الذكي AI' : 'Neural AI Search', icon: Globe },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen flex flex-col transition-colors">
      <Navbar />
      
      <main className="flex-grow w-full py-12 relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob" />
            <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] bg-pink-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-2xl mx-auto px-4 space-y-8">
            
            {/* Minimal Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    {lang === 'ar' ? 'ماسح الشرائح' : 'Chip Scanner'}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    {lang === 'ar' ? 'فحص، بحث، وتشخيص في مكان واحد' : 'Scan, Search, and Diagnose all in one place.'}
                </p>
            </div>

            {lastResult ? (
                <SpecDetails result={lastResult} onReset={resetSearch} />
            ) : (
                <>
                {/* Main Action Card */}
                <Card padding="none" className="group cursor-pointer border-0 shadow-2xl shadow-indigo-100 dark:shadow-indigo-900/30 hover:shadow-indigo-200 dark:hover:shadow-indigo-900/50 transition-all duration-500 bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden">
                    <button 
                    onClick={startCamera}
                    className="w-full relative overflow-hidden p-6 md:p-10 flex flex-col items-center gap-4 md:gap-6 min-h-[220px] justify-center"
                    >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-800 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-indigo-100 dark:shadow-indigo-900/50">
                        <Camera size={28} className="text-indigo-600 md:w-8 md:h-8" />
                    </div>
                    <div className="text-center relative z-10">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        {lang === 'ar' ? 'المسح الذكي' : 'Smart Scan'}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm max-w-[200px] mx-auto">
                        {lang === 'ar' ? 'استخدم الكاميرا لتحليل الرقاقة' : 'Analyze chip via camera'}
                        </p>
                    </div>
                    </button>
                </Card>

                {/* Search Area */}
                <div className="space-y-4 pt-2 ">
                    <Tabs 
                    tabs={[
                        { id: 'local', label: lang === 'ar' ? 'القاعدة المحلية' : 'Local DB' },
                        { id: 'google', label: lang === 'ar' ? 'بحث جوجل' : 'Google Search', icon: Globe },
                    ]}
                    activeTab={searchTab === 'neural' ? 'google' : searchTab} 
                    onChange={(id) => setSearchTab(id === 'google' ? 'neural' : id)} 
                    className="bg-white dark:bg-slate-800 backdrop-blur-sm border-white dark:border-slate-700 cursor-pointer"
                    />

                    <div className="relative">
                    <Input 
                        value={inputCode}
                        onChange={e => setInputCode(e.target.value.toUpperCase())}
                        placeholder={searchTab === 'local' ? (lang === 'ar' ? "ابحث في القاعدة..." : "Search local database...") : (lang === 'ar' ? "ابحث في جوجل..." : "Search on Google...")}
                        className="py-5 cursor-pointer text-xl font-mono text-center rounded-[1.5rem] bg-indigo-50/50 dark:bg-slate-800/50 border-indigo-100 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                        icon={Search}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (searchTab === 'neural') { // logic treats 'neural' as 'google' now
                                    window.open(`https://www.google.com/search?q=${encodeURIComponent(inputCode)}`, '_blank');
                                }
                            }
                        }}
                    />
                    
                    {/* Autocomplete Results for Local DB */}
                    {matches.length > 0 && searchTab === 'local' && (
                        <Card padding="none" className="mt-4 z-50 shadow-2xl bg-white dark:bg-slate-800 border border-gray-400 dark:border-gray-600 overflow-hidden max-h-96 overflow-y-auto custom-scrollbar rounded-[1rem]">
                        {matches.map((m, idx) => (
                            <button 
                            key={idx} 
                            onClick={() => selectMatch(m)}
                            className="w-full p-5 flex justify-between cursor-pointer items-center hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-all text-start"
                            >
                            <div>
                                <div className="text-[10px] text-indigo-600 font-mono mb-1 font-black">{m.code}</div>
                                <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{m.description}</div>
                            </div>
                            <Badge variant="neutral">{m.sizeDisplay}</Badge>
                            </button>
                        ))}
                        </Card>
                    )}

                    {/* Google Search Trigger Button */}
                    {searchTab === 'neural' && inputCode.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Button 
                            onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(inputCode)}`, '_blank')}
                            className="w-full mt-4 py-4 rounded-xl shadow-xl shadow-indigo-600/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                            icon={Globe}
                            >
                            {lang === 'ar' ? 'بحث في جوجل' : 'Search on Google'}
                            </Button>
                        </motion.div>
                    )}
                    </div>
                </div>
                </>
            )}

            {/* Empty State / Quick Links as Footer */}
            {!lastResult && matches.length === 0 && !inputCode && (
                 <div className="pt-8 hidden md:grid grid-cols-3 gap-4 opacity-60 hover:opacity-100 transition-opacity">
                    <a href={appConfig.links.website || '#'} target="_blank" className="flex flex-col items-center gap-2 group">
                        <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                            <Globe size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{lang === 'ar' ? 'الموقع' : 'Site'}</span>
                    </a>
                    <a href={`https://wa.me/${appConfig.links.whatsapp}`} target="_blank" className="flex flex-col items-center gap-2 group">
                        <div className="p-3 bg-green-50 rounded-full text-green-600 group-hover:bg-green-100 transition-colors">
                            <MessageCircle size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{lang === 'ar' ? 'واتساب' : 'WA'}</span>
                    </a>
                    <a href={appConfig.links.orderLink || '#'} target="_blank" className="flex flex-col items-center gap-2 group">
                        <div className="p-3 bg-purple-50 rounded-full text-purple-600 group-hover:bg-purple-100 transition-colors">
                            <ShoppingCart size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{lang === 'ar' ? 'طلب' : 'Order'}</span>
                    </a>
                </div>
            )}

            {/* Global Scanner Overlay */}
            <ScannerModule 
                isOpen={isScannerOpen}
                onClose={closeCamera}
                onCapture={handleCapture}
                isProcessing={isProcessing}
                videoRef={videoRef}
                canvasRef={canvasRef}
            />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Serves;
