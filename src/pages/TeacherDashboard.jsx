import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Upload, Users, ClipboardList, ArrowRight, Save, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import FeeTracker from '../components/FeeTracker';
import TestCreator from '../components/TestCreator';

const TeacherDashboard = ({ activeTab }) => {
  const { t, language } = useLanguage();
  const [classUrl, setClassUrl] = useState('');

  if (activeTab === 'fees') return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <FeeTracker />
    </motion.div>
  );
  
  if (activeTab === 'mcq') return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <TestCreator />
    </motion.div>
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-6xl font-black text-zinc-900 font-heading tracking-tighter mb-2 uppercase italic leading-none">
            TEACHER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">ZONE</span>
          </h1>
          <p className="text-purple-600/80 font-bold uppercase tracking-widest text-[10px] italic">{language === 'en' ? 'Educate, Inspire, Dominate.' : 'शिक्षित करें, प्रेरित करें, हावी हों।'}</p>
        </div>
        <div className="bg-white border border-purple-100 p-5 rounded-[2.5rem] flex items-center gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] glass">
           <div className="bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white p-4 rounded-2xl shadow-lg shadow-purple-500/20">
              <Users size={28} strokeWidth={2.5}/>
           </div>
           <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-2">Active Students</p>
              <p className="text-4xl font-black text-zinc-800 leading-none font-heading tracking-tighter">842</p>
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* Class Link Manager */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white text-zinc-900 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] p-14 relative overflow-hidden group border border-purple-100 hover:border-purple-300 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.2)] transition-all"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-fuchsia-200 opacity-30 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-50" />
          
          <h2 className="text-3xl font-black mb-10 flex items-center gap-5 font-heading relative z-10 uppercase tracking-tighter italic text-zinc-800">
             <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-sm scale-110 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-fuchsia-500 group-hover:text-white transition-all duration-500">
               <Link size={28} />
             </div>
             {language === 'en' ? 'SESSION LAUNCHER' : 'सत्र लांचर'}
          </h2>
          
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
               <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] ml-6 italic">{t('pasteUrl')}</label>
               <input 
                 type="text" 
                 value={classUrl}
                 onChange={(e) => setClassUrl(e.target.value)}
                 placeholder="https://meet.google.com/xyz-abc-123"
                 className="w-full p-6 rounded-[2rem] bg-slate-50 border border-purple-100 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100/50 outline-none transition-all duration-500 font-bold text-zinc-800 text-lg shadow-inner placeholder:text-zinc-300"
               />
            </div>
            <button className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white py-6 rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-lg shadow-purple-500/25 hover:from-purple-600 hover:to-fuchsia-600 transition-all flex items-center justify-center gap-4 active:scale-95 border-b-4 border-purple-700 hover:border-b-0 hover:mt-1 hover:mb-[-1px]">
              {t('saveLink')}
              <ArrowRight size={24} strokeWidth={3} />
            </button>
          </div>
        </motion.div>

        {/* Material Upload */}
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] border border-purple-100 p-14 relative overflow-hidden group hover:border-purple-300 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.2)] transition-all"
        >
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-fuchsia-200 to-pink-200 opacity-30 rounded-full blur-3xl -mr-32 -mb-32 transition-opacity group-hover:opacity-50" />
          
          <h2 className="text-3xl font-black text-zinc-800 mb-10 flex items-center gap-5 font-heading relative z-10 uppercase tracking-tighter italic">
             <div className="w-14 h-14 bg-fuchsia-50 text-fuchsia-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-gradient-to-br group-hover:from-fuchsia-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-500">
               <Upload size={28} />
             </div>
             {language === 'en' ? 'RESOURCE VAULT' : 'संसाधन वॉल्ट'}
          </h2>

          <div className="border-4 border-dashed border-purple-200 rounded-[3rem] p-14 flex flex-col items-center justify-center text-center hover:bg-purple-50/50 hover:border-purple-400/50 transition-all duration-500 cursor-pointer group/upload bg-slate-50/50">
            <motion.div 
               whileHover={{ y: -10, rotate: [0, -5, 5, 0] }}
               className="w-24 h-24 bg-white text-purple-500 rounded-[2rem] flex items-center justify-center mb-8 shadow-md border border-purple-100/50 group-hover/upload:bg-gradient-to-br group-hover/upload:from-purple-500 group-hover/upload:to-fuchsia-500 group-hover/upload:text-white transition-colors"
            >
              <Upload size={48} />
            </motion.div>
            <p className="text-2xl font-black text-zinc-800 tracking-tighter uppercase italic group-hover/upload:text-purple-700 transition-colors">
              {language === 'en' ? 'SYNC NEW CONTENT' : 'नयी सामग्री सिंक करें'}
            </p>
            <p className="text-[10px] text-zinc-400 font-bold mt-3 uppercase tracking-widest">Syllabus • Notes • Assignments</p>
          </div>
        </motion.div>

      </div>

      {/* Modern Highlight Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div 
           whileHover={{ y: -12 }}
           className="bg-white text-zinc-900 p-14 rounded-[3.5rem] flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] relative overflow-hidden group cursor-pointer border border-purple-100 hover:border-purple-300 transition-colors"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 transform translate-x-12 -translate-y-12 rotate-[-20deg] group-hover:rotate-0 group-hover:opacity-[0.08] transition-all duration-1000 text-purple-600">
             <ClipboardList size={250} />
          </div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-[1.5rem] flex items-center justify-center mb-10 shadow-sm scale-110 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-fuchsia-500 group-hover:text-white transition-all duration-500 border border-purple-100">
               <ClipboardList size={40} />
            </div>
            <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase italic text-zinc-800 group-hover:text-purple-700 transition-colors">{language === 'en' ? 'ENGINEER EXAM' : 'परीक्षा इंजीनियर'}</h3>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-sm tracking-tight italic">
              {language === 'en' ? 'Forge high-impact MCQ sets with real-time analytics.' : 'वास्तविक समय विश्लेषण के साथ उच्च-प्रभाव वाले एमसीक्यू सेट बनाएं।'}
            </p>
          </div>
          <div className="mt-14 flex items-center gap-3 font-black text-purple-600 uppercase tracking-[0.3em] text-[10px] relative z-10">
             OPEN FORGE <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </motion.div>

        <motion.div 
           whileHover={{ y: -12 }}
           className="bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white p-14 rounded-[3.5rem] flex flex-col justify-between shadow-2xl shadow-purple-500/20 relative overflow-hidden group cursor-pointer border-b-8 border-purple-700 hover:border-b-0 hover:mt-2 hover:mb-[-2px]"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.05] scale-150 transform translate-x-12 -translate-y-12 rotate-[20deg] group-hover:rotate-0 group-hover:opacity-[0.1] transition-all duration-1000">
             <Users size={250} color="white" />
          </div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-[1.5rem] flex items-center justify-center mb-10 shadow-xl group-hover:bg-white group-hover:text-purple-600 transition-colors duration-500">
               <Users size={40} />
            </div>
            <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">{language === 'en' ? 'FEE WATCHDOG' : 'शुल्क वॉचडॉग'}</h3>
            <p className="text-purple-100/90 text-lg font-medium leading-relaxed max-w-sm tracking-tight italic">
              {language === 'en' ? 'Audit payment status and scholarship distributions.' : 'भुगतान स्थिति और छात्रवृत्ति वितरण का ऑडिट करें।'}
            </p>
          </div>
          <div className="mt-14 flex items-center gap-3 font-black text-white uppercase tracking-[0.3em] text-[10px] relative z-10">
             OPEN AUDIT <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default TeacherDashboard;
