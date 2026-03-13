import React from 'react';
import { motion } from 'framer-motion';
import { Video, FileDown, CheckCircle, Clock, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StudentDashboard = ({ activeTab }) => {
  const { t, language } = useLanguage();

  const liveClasses = [
    { id: 1, title: 'Maths - Trigonometry', time: '10:00 AM', teacher: 'R.K. Sharma', status: 'live' },
    { id: 2, title: 'Science - Optics', time: '12:30 PM', teacher: 'S. Gupta', status: 'upcoming' },
  ];

  const materials = [
    { id: 1, title: 'Grade 10 Maths Syllabus', type: 'PDF', size: '1.2 MB' },
    { id: 2, title: 'Chapter 2 Physics Notes', type: 'DOCX', size: '0.8 MB' },
    { id: 3, title: 'Chemistry Periodic Table', type: 'IMG', size: '2.5 MB' },
  ];

  const mcqs = [
    { id: 1, title: 'Weekly Assessment - Algebra', questions: 20, difficulty: 'Medium' },
    { id: 2, title: 'General Science Quiz', questions: 15, difficulty: 'Easy' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const StatCard = ({ title, value, sub, icon: Icon, colorClass, borderClass, bgClass, delay }) => (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      whileHover={{ y: -5 }}
      className={`bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${borderClass} flex items-center gap-6 hover:shadow-[0_8px_30px_rgb(168,85,247,0.12)] transition-all duration-300`}
    >
      <div className={`p-5 rounded-2xl ${bgClass} ${colorClass} shadow-inner`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] mb-1">{title}</p>
        <h3 className="text-3xl font-black text-zinc-800 tracking-tight">{value}</h3>
        <p className="text-sm text-purple-600/80 font-bold mt-1 tracking-tight">{sub}</p>
      </div>
    </motion.div>
  );

  if (activeTab === 'fees') return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-10">
      <div className="bg-white/80 backdrop-blur-2xl p-16 rounded-[3rem] text-center shadow-[0_20px_60px_-15px_rgba(168,85,247,0.15)] relative overflow-hidden border border-purple-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-fuchsia-200 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
        <div className="relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-purple-500/25 rotate-3 hover:rotate-6 transition-transform">
             <CheckCircle size={44} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-black text-zinc-800 mb-2 font-heading tracking-tight underline decoration-purple-400 decoration-4 underline-offset-8">{t('feeStatus')}</h2>
          <p className="text-zinc-500 mb-12 text-lg font-medium mt-6">{language === 'en' ? 'Your academic journey is secure.' : 'आपकी शैक्षणिक यात्रा सुरक्षित है।'}</p>
          
          <div className="inline-block px-16 py-10 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-[2.5rem] mb-12 border border-purple-100 shadow-inner">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600 font-black text-7xl tracking-tighter mb-2">{t('paid')}</div>
            <p className="text-purple-400 font-black uppercase tracking-[0.3em] text-[10px]">Next: Oct 15, 2026</p>
          </div>
          
          <div className="flex justify-center gap-6">
            <button className="px-10 py-5 bg-white text-zinc-600 border px-6 border-zinc-200 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-50 hover:text-zinc-900 transition-all shadow-sm active:scale-95">View Receipt</button>
            <button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:from-purple-600 hover:to-fuchsia-600 transition-all shadow-lg shadow-purple-500/25 active:scale-95">Pay Advance</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
  
  if (activeTab === 'mcq') return (
    <div className="space-y-10 max-w-6xl mx-auto">
       <div className="flex justify-between items-end">
          <div>
             <h2 className="text-4xl font-black text-zinc-800 font-heading tracking-tighter">{t('mcqTests')}</h2>
             <p className="text-purple-500 font-bold uppercase tracking-[0.2em] text-xs mt-2 flex items-center gap-2">
                <Sparkles size={14} />
                {language === 'en' ? 'Master of Success' : 'सफलता के गुरु'}
             </p>
          </div>
       </div>

       <motion.div 
         variants={container}
         initial="hidden"
         animate="show"
         className="grid grid-cols-1 md:grid-cols-2 gap-8"
       >
          {mcqs.map((test) => (
            <motion.div 
              key={test.id} 
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-10 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-purple-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.15)] flex justify-between items-center group hover:border-purple-300 transition-all duration-500"
            >
               <div className="text-left">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block ${test.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                    {test.difficulty}
                  </span>
                  <h4 className="text-2xl font-black text-zinc-800 tracking-tight group-hover:text-purple-700 transition-colors">{test.title}</h4>
                  <p className="text-zinc-400 font-bold text-[10px] mt-3 uppercase tracking-widest">{test.questions} Items • 30 Mins</p>
               </div>
               <button className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-fuchsia-500 group-hover:text-white transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-purple-500/25">
                  <ExternalLink size={24} strokeWidth={2} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
            </motion.div>
          ))}
       </motion.div>
    </div>
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-6xl font-black text-zinc-900 font-heading tracking-tighter mb-2">
            HELLO, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">ABHISHEK!</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium tracking-tight">{language === 'en' ? 'Your academic peak awaits today.' : 'शीर्ष शैक्षणिक सफलता आज आपकी प्रतीक्षा कर रही है।'}</p>
        </div>
        <div className="bg-white text-zinc-800 px-10 py-5 rounded-[2rem] font-black shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-purple-100 text-xl tracking-tighter uppercase relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-fuchsia-50 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">Grade 10<span className="text-purple-400 ml-1 italic">TH</span></span>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title={t('liveClasses')} value="2" sub="Starting in 15m" icon={Video} colorClass="text-purple-600" bgClass="bg-purple-50" borderClass="border-purple-100/50" delay={0.1} />
        <StatCard title={t('feeStatus')} value={t('paid')} sub="Status: Secure" icon={Clock} colorClass="text-emerald-600" bgClass="bg-emerald-50" borderClass="border-emerald-100/50" delay={0.2} />
        <StatCard title={t('mcqTests')} value="12" sub="1 New assigned" icon={CheckCircle} colorClass="text-fuchsia-600" bgClass="bg-fuchsia-50" borderClass="border-fuchsia-100/50" delay={0.3} />
      </div>

      {/* Main Content Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 xl:grid-cols-2 gap-10"
      >
        
        {/* Live Classes Card */}
        <motion.div variants={item} className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] border border-purple-100 overflow-hidden transition-colors">
          <div className="p-10 border-b border-purple-50/50 flex justify-between items-center bg-gradient-to-br from-purple-50/30 to-transparent">
            <h2 className="text-3xl font-black text-zinc-800 flex items-center gap-4 font-heading tracking-tight uppercase">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-purple-500/20 rotate-3">
                <Video size={24} strokeWidth={1.5} />
              </div>
              {t('liveClasses')}
            </h2>
            <div className="flex items-center gap-2 text-rose-600 font-bold text-[10px] uppercase tracking-[0.2em] bg-rose-50 border border-rose-100 px-5 py-2.5 rounded-full shadow-sm">
               <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
               LIVE NOW
            </div>
          </div>
          <div className="p-10 space-y-6">
            {liveClasses.map(cls => (
              <div key={cls.id} className="flex items-center justify-between p-8 bg-white border border-purple-100/50 rounded-[2.5rem] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-purple-300 transition-all group cursor-pointer">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-purple-50 rounded-[1.25rem] flex items-center justify-center text-purple-500 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-fuchsia-500 group-hover:text-white transition-all shadow-sm group-hover:shadow-md">
                      <BookOpen size={28} strokeWidth={1.5} />
                   </div>
                   <div>
                      <h4 className="font-black text-zinc-800 text-xl group-hover:text-purple-700 transition-colors uppercase tracking-tight">{cls.title}</h4>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] mt-1.5">{cls.time} • Prof. {cls.teacher}</p>
                   </div>
                </div>
                <button className={`px-8 py-4 rounded-[1rem] text-[10px] font-black tracking-[0.2em] uppercase transition-all shadow-sm ${cls.status === 'live' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:shadow-lg hover:shadow-purple-500/25 active:scale-95' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                  {cls.status === 'live' ? 'Join Portal' : 'Notify'}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Study Materials Card */}
        <motion.div variants={item} className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] border border-purple-100 overflow-hidden transition-colors">
          <div className="p-10 border-b border-purple-50/50 flex justify-between items-center bg-gradient-to-br from-fuchsia-50/30 to-transparent">
            <h2 className="text-3xl font-black text-zinc-800 flex items-center gap-4 font-heading tracking-tight uppercase">
              <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-400 to-pink-500 text-white rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-fuchsia-500/20 rotate-3">
                <FileDown size={24} strokeWidth={1.5} />
              </div>
              {t('studyMaterials')}
            </h2>
            <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-zinc-400 hover:bg-purple-50 hover:text-purple-600 transition-colors">
              <ExternalLink size={18} />
            </button>
          </div>
          <div className="p-10 space-y-6">
            {materials.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-8 border-2 border-dashed border-purple-100/60 rounded-[2.5rem] bg-slate-50/50 hover:bg-white hover:border-purple-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all group cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white text-fuchsia-500 rounded-[1.25rem] flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform border border-purple-100/50 group-hover:shadow-md">
                    <FileDown size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-black text-zinc-800 text-lg uppercase tracking-tight group-hover:text-fuchsia-700 transition-colors">{doc.title}</h4>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[9px] bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100 px-3 py-1 rounded-md font-black tracking-[0.2em] uppercase">{doc.type}</span>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">{doc.size}</span>
                    </div>
                  </div>
                </div>
                <button className="w-12 h-12 rounded-[1rem] bg-white border border-slate-200 text-slate-400 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-fuchsia-500 group-hover:to-pink-500 group-hover:text-white group-hover:border-transparent transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-fuchsia-500/25">
                  <FileDown size={20} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default StudentDashboard;
