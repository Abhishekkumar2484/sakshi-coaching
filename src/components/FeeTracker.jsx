import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Search, Filter, CheckCircle, XCircle, IndianRupee, ArrowUpRight } from 'lucide-react';

const FeeTracker = () => {
  const { t, language } = useLanguage();
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Sharma', grade: '10th', amount: '₹5000', status: 'paid', date: '2026-03-10' },
    { id: 2, name: 'Ishani Gupta', grade: '12th', amount: '₹6500', status: 'due', date: '-' },
    { id: 3, name: 'Vihaan Patel', grade: '9th', amount: '₹4500', status: 'paid', date: '2026-03-05' },
    { id: 4, name: 'Riya Verma', grade: '11th', amount: '₹5500', status: 'due', date: '-' },
  ]);

  const toggleStatus = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, status: s.status === 'paid' ? 'due' : 'paid', date: s.status === 'paid' ? '-' : new Date().toISOString().split('T')[0] } : s
    ));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-white/90 backdrop-blur-2xl rounded-[4rem] shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] border border-purple-100 overflow-hidden transition-colors">
      <div className="p-16 border-b border-purple-100 flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-gradient-to-br from-slate-50 to-white">
        <div>
          <div className="flex items-center gap-5 mb-3 text-zinc-800">
             <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-sm border border-purple-100">
               <IndianRupee size={32} strokeWidth={2.5} />
             </div>
             <h2 className="text-4xl font-black font-heading tracking-tighter uppercase italic">{language === 'en' ? 'Audit Logs' : 'ऑडिट लॉग'}</h2>
          </div>
          <p className="text-purple-600 font-bold uppercase tracking-widest text-[10px] ml-1 opacity-80 italic">{language === 'en' ? 'Financial Transparency Protocol' : 'वित्तीय पारदर्शिता प्रोटोकॉल'}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-purple-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder={language === 'en' ? 'Search students...' : 'छात्रों को खोजें...'} 
              className="pl-16 pr-10 py-5 rounded-[2rem] bg-white border border-purple-100 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100/50 transition-all duration-500 w-full lg:w-96 font-bold text-zinc-800 shadow-inner placeholder:text-zinc-300 relative z-20"
            />
          </div>
          <button className="px-10 py-5 bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white rounded-[2rem] hover:from-purple-600 hover:to-fuchsia-600 transition-all font-black uppercase text-[10px] tracking-widest shadow-lg shadow-purple-500/20 flex items-center justify-center gap-3 active:scale-95 border-b-4 border-purple-700 hover:border-b-0 hover:mt-1 hover:mb-[-1px] relative z-20">
            <Filter size={18} /> {language === 'en' ? 'SCRUB DATA' : 'डेटा साफ़ करें'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-8 sm:p-14 bg-white/50">
        <motion.table 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full text-left border-separate border-spacing-y-4"
        >
          <thead>
            <tr className="text-zinc-400 font-bold uppercase tracking-[0.5em] text-[10px]">
              <th className="px-10 pb-4">{t('studentName')}</th>
              <th className="px-10 pb-4">{t('grade')}</th>
              <th className="px-10 pb-4">{t('amount')}</th>
              <th className="px-10 pb-4">{t('status')}</th>
              <th className="px-10 pb-4 text-right">{t('action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {students.map((student) => (
              <motion.tr 
                key={student.id} 
                variants={item}
                className="group transition-all"
              >
                <td className="px-10 py-6 first:rounded-l-[3rem] border-y border-l border-transparent group-hover:border-purple-200 bg-slate-50 shadow-sm transition-all group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:bg-white group-hover:scale-[1.01] relative z-10">
                  <div className="font-black text-zinc-800 text-2xl tracking-tighter uppercase italic">{student.name}</div>
                  <div className="text-[10px] font-bold text-purple-600 tracking-widest mt-1 opacity-80 uppercase">Hash: #SK-{student.id}99X</div>
                </td>
                <td className="px-10 py-6 border-y border-transparent group-hover:border-purple-200 bg-slate-50 shadow-sm transition-all group-hover:bg-white relative z-10">
                  <span className="px-6 py-2 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black tracking-widest uppercase border border-purple-100">{student.grade}</span>
                </td>
                <td className="px-10 py-6 border-y border-transparent group-hover:border-purple-200 bg-slate-50 shadow-sm transition-all group-hover:bg-white relative z-10">
                   <div className="flex items-center gap-2 font-black text-zinc-800 text-2xl tracking-tighter italic">
                      <span className="text-purple-600 text-sm italic font-black">₹</span> {student.amount.replace('₹', '')}
                   </div>
                </td>
                <td className="px-10 py-6 border-y border-transparent group-hover:border-purple-200 bg-slate-50 shadow-sm transition-all group-hover:bg-white relative z-10">
                  <span className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border ${
                    student.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'
                  }`}>
                    {student.status === 'paid' ? <CheckCircle size={16} strokeWidth={3}/> : <XCircle size={16} strokeWidth={3}/>}
                    {student.status === 'paid' ? t('paid') : t('due')}
                  </span>
                </td>
                <td className="px-10 py-6 last:rounded-r-[3rem] border-y border-r border-transparent group-hover:border-purple-200 bg-slate-50 shadow-sm text-right transition-all group-hover:bg-white relative z-10">
                  <button 
                    onClick={() => toggleStatus(student.id)}
                    className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all inline-flex items-center gap-3 active:scale-95 ${
                      student.status === 'paid' ? 'bg-slate-100 text-zinc-500 hover:bg-rose-50 hover:text-rose-600 border border-transparent hover:border-rose-200' : 'bg-purple-100 text-purple-700 shadow-sm hover:bg-purple-600 hover:text-white border-b-2 border-purple-300 hover:border-b-0 hover:mt-[2px]'
                    }`}
                  >
                    {student.status === 'paid' ? (language === 'en' ? 'Revoke Access' : 'पहुंच रद्द करें') : (language === 'en' ? 'Release Access' : 'पहुंच जारी करें')}
                    <ArrowUpRight size={16} strokeWidth={3} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default FeeTracker;
