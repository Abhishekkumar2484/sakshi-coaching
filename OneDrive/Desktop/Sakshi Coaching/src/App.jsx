import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import PortalSelector from './components/PortalSelector';
import Sidebar from './components/Sidebar';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import OwnerPanel from './pages/OwnerPanel';
import { Languages } from 'lucide-react';

function AppContent() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toggleLanguage, t } = useLanguage();

  const handleLogout = () => {
    setRole(null);
    setActiveTab('dashboard');
  };

  return (
    <AnimatePresence mode="wait">
      {!role ? (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <PortalSelector onSelect={setRole} />
        </motion.div>
      ) : (
        <motion.div
          key="portal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex bg-slate-50/50 min-h-screen"
        >
          <Sidebar 
            role={role} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onLogout={handleLogout} 
          />
          
          <main className="flex-grow ml-80 p-12 overflow-x-hidden relative">
            {/* Top Navbar */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-end mb-12 relative z-50"
            >
               <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-zinc-700 border border-purple-100 hover:border-purple-300 hover:text-purple-600 transition-all shadow-sm font-bold active:scale-95 group"
                >
                  <Languages size={20} className="text-zinc-400 group-hover:text-purple-600 transition-colors" />
                  {t('switchLanguage')}
                </button>
            </motion.div>

            {/* Dynamic Content with smooth tab switching */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${role}-${activeTab}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                {role === 'student' && <StudentDashboard activeTab={activeTab} />}
                {role === 'teacher' && <TeacherDashboard activeTab={activeTab} />}
                {role === 'owner' && <OwnerPanel activeTab={activeTab} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
