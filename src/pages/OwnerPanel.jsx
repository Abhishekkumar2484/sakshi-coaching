import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Users, BookOpen, IndianRupee, Activity, TrendingUp, Settings, Plus, LayoutGrid, Bell } from 'lucide-react';

const OwnerPanel = () => {
  const { t, language } = useLanguage();

  const stats = [
    { label: language === 'en' ? 'Enrolled Students' : 'नामांकित छात्र', value: '1,240', icon: Users, color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-500', shadow: 'shadow-purple-500/20' },
    { label: language === 'en' ? 'Certified Teachers' : 'प्रमाणित शिक्षक', value: '84', icon: BookOpen, color: 'text-purple-600', bg: 'bg-white', shadow: 'shadow-sm border border-purple-100' },
    { label: language === 'en' ? 'Institute Revenue' : 'संस्थान राजस्व', value: '₹4.8L', icon: IndianRupee, color: 'text-white', bg: 'bg-gradient-to-br from-fuchsia-500 to-pink-500', shadow: 'shadow-fuchsia-500/20' },
    { label: language === 'en' ? 'Active Systems' : 'सक्रिय प्रणाली', value: '100%', icon: Activity, color: 'text-purple-600', bg: 'bg-white', shadow: 'shadow-sm border border-purple-100' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Dynamic Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-8">
           <div className="w-20 h-20 bg-white text-purple-600 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center border border-purple-100">
              <LayoutGrid size={40} />
           </div>
           <div>
              <h1 className="text-5xl font-black text-zinc-900 font-heading tracking-tighter uppercase italic">{t('ownerPortal')}</h1>
              <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.5em] mt-1">Institutional Authority & Governance</p>
           </div>
        </div>
        <div className="flex gap-6">
           <button className="w-16 h-16 bg-white rounded-[1.5rem] border border-purple-100 flex items-center justify-center text-zinc-400 hover:text-purple-600 hover:border-purple-300 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group active:scale-95">
              <Bell size={24} className="group-hover:rotate-12 transition-transform" />
              <div className="absolute top-4 right-4 w-3 h-3 bg-fuchsia-500 rounded-full border-2 border-white" />
           </button>
           <button className="flex items-center gap-4 px-10 py-5 bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-purple-500/20 hover:from-purple-600 hover:to-fuchsia-600 transition-all active:scale-95 border-b-4 border-purple-700 hover:border-b-0 hover:mt-1 hover:mb-[-1px]">
              <Settings size={20} /> {language === 'en' ? 'SYSTEM SETTINGS' : 'सिस्टम सेटिंग्स'}
           </button>
        </div>
      </motion.div>

      {/* Modern Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] border border-purple-100 relative overflow-hidden group hover:border-purple-300 transition-all"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} opacity-5 rounded-full blur-[40px] transform translate-x-12 -translate-y-12 transition-transform group-hover:scale-150 group-hover:opacity-10`} />
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-md ${stat.shadow} group-hover:rotate-6 transition-transform`}>
               <stat.icon size={32} strokeWidth={2} />
            </div>
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] relative z-10 mb-2">{stat.label}</h3>
            <div className="text-4xl font-black text-zinc-800 tracking-tighter relative z-10 font-heading group-hover:text-purple-700 transition-colors uppercase italic">{stat.value}</div>
            
            <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 relative z-10 italic">
               <TrendingUp size={14} /> +12% GROWTH
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Performance Visualization */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="xl:col-span-2 bg-white/90 backdrop-blur-2xl rounded-[4rem] shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] border border-purple-100 p-16 relative overflow-hidden hover:border-purple-300 transition-colors"
        >
          <div className="flex justify-between items-center mb-12">
             <h2 className="text-3xl font-black text-zinc-800 flex items-center gap-5 font-heading tracking-tighter uppercase italic">
               <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-sm border border-purple-100">
                 <TrendingUp size={28} />
               </div>
               {language === 'en' ? 'Admission Pulse' : 'प्रवेश पल्स'}
             </h2>
             <div className="flex gap-4">
                <span className="px-6 py-2 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-100 shadow-sm">Fiscal 2026</span>
             </div>
          </div>
          
          <div className="h-80 flex items-end justify-between gap-6 px-4 border-b-2 border-purple-100 pb-2">
             {[30, 55, 40, 85, 50, 95, 70, 80, 60, 45, 90, 75].map((h, i) => (
               <div key={i} className="w-full bg-slate-50/80 rounded-t-[1.5rem] relative group h-full hover:bg-purple-50 transition-colors">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.8 + (i * 0.05), duration: 1, ease: "circOut" }}
                    className={`absolute bottom-0 w-full rounded-t-[1.5rem] transition-all duration-500 bg-gradient-to-t from-purple-400 to-fuchsia-400 group-hover:from-purple-500 group-hover:to-fuchsia-500 shadow-md`}
                  >
                     <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-purple-600 text-[10px] px-4 py-2 rounded-xl font-black border border-purple-100 opacity-0 group-hover:opacity-100 transition-all pointer-events-none transform translate-y-3 group-hover:translate-y-0 shadow-lg">
                       {h}%
                     </div>
                  </motion.div>
               </div>
             ))}
          </div>
          <div className="flex justify-between mt-8 text-[9px] font-bold text-zinc-400 uppercase tracking-[0.4em] opacity-80">
             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </motion.div>

        {/* Global Control Hub */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white text-zinc-800 rounded-[4rem] p-16 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] flex flex-col justify-between relative overflow-hidden group border border-purple-100"
        >
           <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-200 to-fuchsia-200 opacity-[0.15] rounded-full blur-[60px] transform translate-x-20 -translate-y-20 transition-transform group-hover:scale-150 duration-1000" />
           
           <div className="relative z-10 w-full">
              <h2 className="text-4xl font-black mb-12 tracking-tighter font-heading italic uppercase">COMMAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">HUB</span></h2>
              <div className="space-y-6">
                 <button className="w-full py-6 px-10 bg-slate-50 border border-slate-200 rounded-[2.5rem] font-bold text-zinc-600 text-left hover:bg-white hover:border-purple-300 hover:text-purple-700 hover:shadow-md transition-all flex justify-between items-center group/btn active:scale-95">
                    <span className="uppercase text-[11px] tracking-widest">{language === 'en' ? 'Teacher Onboarding' : 'शिक्षक ऑनबोर्डिंग'}</span>
                    <Plus size={24} className="group-hover/btn:rotate-90 transition-transform text-purple-400" />
                 </button>
                 <button className="w-full py-6 px-10 bg-slate-50 border border-slate-200 rounded-[2.5rem] font-bold text-zinc-600 text-left hover:bg-white hover:border-purple-300 hover:text-purple-700 hover:shadow-md transition-all flex justify-between items-center group/btn active:scale-95">
                    <span className="uppercase text-[11px] tracking-widest">{language === 'en' ? 'Global Broadcast' : 'वैश्विक प्रसारण'}</span>
                    <Bell size={24} className="group-hover/btn:animate-bounce transition-all text-purple-400" />
                 </button>
                 <button className="w-full mt-10 py-7 px-10 bg-purple-50 text-purple-600 border border-purple-100 rounded-[2.5rem] font-black text-center shadow-sm hover:bg-gradient-to-br hover:from-purple-500 hover:to-fuchsia-500 hover:text-white transition-all flex justify-center items-center gap-4 active:scale-95 uppercase tracking-widest text-xs group/export hover:shadow-lg hover:shadow-purple-500/25 hover:border-transparent">
                    {language === 'en' ? 'EXPORT ANNUAL AUDIT' : 'वार्षिक ऑडिट एक्सपोर्ट करें'}
                    <IndianRupee size={22} strokeWidth={3} className="group-hover/export:text-white" />
                 </button>
              </div>
           </div>

           <div className="relative z-10 mt-16 p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-200 shadow-inner">
              <p className="text-[9px] font-black text-fuchsia-500 uppercase tracking-[0.5em] mb-3">System Integrity</p>
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                 <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Enforce Protocol Alpha</span>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OwnerPanel;
