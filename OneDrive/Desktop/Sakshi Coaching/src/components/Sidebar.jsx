import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  CreditCard, 
  ClipboardList, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ activeTab, setActiveTab, onLogout, role }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'classes', label: t('liveClasses'), icon: Video },
    { id: 'materials', label: t('studyMaterials'), icon: FileText },
    { id: 'fees', label: t('feeStatus'), icon: CreditCard },
    { id: 'mcq', label: t('mcqTests'), icon: ClipboardList },
  ];

  return (
    <motion.div 
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-80 bg-white/95 backdrop-blur-xl h-screen flex flex-col p-8 fixed left-0 top-0 z-20 border-r border-purple-100"
    >
      <div className="mb-14 flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white shadow-[0_8px_20px_rgba(168,85,247,0.25)] rotate-3">
          <GraduationCap size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-black font-heading leading-tight tracking-tighter text-zinc-900">
            SAKSHI
          </h1>
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.4em] block -mt-1">{role} Portal</span>
        </div>
      </div>

      <nav className="flex-grow space-y-3">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index + 0.3 }}
            onClick={() => setActiveTab(item.id)}
            className={`w-full group flex items-center justify-between p-5 rounded-2xl transition-all duration-400 relative overflow-hidden ${
              activeTab === item.id 
                ? 'bg-purple-100/50 text-purple-900 shadow-[0_8px_20px_-5px_rgba(168,85,247,0.1)] border border-purple-200/50' 
                : 'hover:bg-purple-50 text-zinc-500 hover:text-purple-700 border border-transparent'
            }`}
          >
            <div className={`flex items-center gap-4 relative z-10 transition-transform ${activeTab === item.id ? '' : 'group-hover:translate-x-1'} duration-300`}>
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} className={activeTab === item.id ? 'text-purple-600' : 'text-zinc-400 group-hover:text-purple-500'} />
              <span className={`font-bold tracking-[0.2em] text-[10px] uppercase ${activeTab === item.id ? 'text-purple-900 font-black' : ''}`}>{item.label}</span>
            </div>
          </motion.button>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-4 p-5 rounded-2xl text-zinc-500 font-bold hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 group"
      >
        <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
          <LogOut size={20} className="text-zinc-400 group-hover:text-rose-500" />
        </div>
        <span className="tracking-widest uppercase text-[10px] font-black">{t('logout')}</span>
      </button>

      <div className="absolute top-1/2 right-[-50px] w-32 h-32 bg-purple-200/40 blur-[100px] pointer-events-none" />
    </motion.div>
  );
};

export default Sidebar;
