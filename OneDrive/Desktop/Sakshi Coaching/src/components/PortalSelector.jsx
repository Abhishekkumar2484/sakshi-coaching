import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, ShieldCheck, Languages, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PortalSelector = ({ onSelect }) => {
  const { t, toggleLanguage, language } = useLanguage();

  const portals = [
    {
      id: 'student',
      title: t('studentPortal'),
      icon: GraduationCap,
      color: 'from-purple-400 to-fuchsia-500',
      accentColor: 'text-purple-600',
      description: language === 'en' 
        ? 'Access your courses, assignments, and class schedules.' 
        : 'अपने पाठ्यक्रमों, असाइनमेंट और कक्षा के समय सारणी तक पहुंचें।'
    },
    {
      id: 'teacher',
      title: t('teacherPortal'),
      icon: Users,
      color: 'from-fuchsia-400 to-pink-500',
      accentColor: 'text-fuchsia-600',
      description: language === 'en'
        ? 'Manage classes, upload materials, and track student progress.'
        : 'कक्षाओं का प्रबंधन करें, सामग्री अपलोड करें और छात्रों की प्रगति को ट्रैक करें।'
    },
    {
      id: 'owner',
      title: t('ownerPortal'),
      icon: ShieldCheck,
      color: 'from-violet-400 to-purple-600',
      accentColor: 'text-violet-600',
      description: language === 'en'
        ? 'Full administrative control over the institute operations.'
        : 'संस्थान के संचालन पर पूर्ण प्रशासनिक नियंत्रण।'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-fuchsia-200/40 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-20 relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-purple-200 text-purple-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-sm"
        >
          <Sparkles size={12} className="text-purple-400" />
          {language === 'en' ? 'Excellence in Rural Education' : 'ग्रामीण शिक्षा में उत्कृष्टता'}
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-black text-zinc-900 mb-6 font-heading tracking-tighter leading-none drop-shadow-sm">
          {t('title').split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>
        
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium tracking-tight">
          {t('subtitle')}
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleLanguage}
          className="mt-10 group flex items-center gap-3 px-8 py-4 rounded-2xl glass border-purple-100 hover:border-purple-300 text-zinc-700 font-bold transition-all duration-500 shadow-sm hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] bg-white/80"
        >
          <Languages size={18} className="text-purple-500 group-hover:rotate-12 transition-transform" />
          <span className="text-sm tracking-wide">{t('switchLanguage')}</span>
        </motion.button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full relative z-10"
      >
        {portals.map((portal) => (
          <motion.div
            key={portal.id}
            variants={itemVariants}
            onClick={() => onSelect(portal.id)}
            className="group cursor-pointer bg-white/70 backdrop-blur-xl border border-purple-100/50 rounded-[40px] p-12 flex flex-col h-full shadow-[0_8px_30px_-5px_rgba(168,85,247,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.15)] hover:-translate-y-2 transition-all duration-500 hover:border-purple-300/50 relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className={`mb-10 w-24 h-24 rounded-3xl bg-gradient-to-br ${portal.color} p-0.5 shadow-lg shadow-purple-200/50 group-hover:rotate-6 transition-all duration-700 relative z-10`}>
              <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
                <portal.icon size={44} className={portal.accentColor} strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-3xl font-black mb-4 font-heading text-zinc-800 tracking-tight uppercase relative z-10">
              {portal.title}
            </h2>
            
            <p className="text-zinc-500 text-lg mb-12 leading-relaxed font-medium flex-grow relative z-10">
              {portal.description}
            </p>

            <div className="flex items-center justify-between mt-auto relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">Access Portal</span>
                <span className={`text-sm font-bold ${portal.accentColor} transition-colors uppercase tracking-widest`}>
                  {t('enterPortal')}
                </span>
              </div>
              <div className={`w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 group-hover:bg-gradient-to-br ${portal.color} group-hover:text-white group-hover:border-transparent text-purple-500 flex items-center justify-center transition-all duration-500 shadow-sm group-hover:shadow-[0_8px_20px_rgba(168,85,247,0.25)]`}>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-24 text-zinc-400 text-[10px] font-bold tracking-[0.4em] uppercase"
      >
        © 2026 {t('title')} <span className="mx-2 opacity-30">•</span> Empowering Rural India
      </motion.footer>
    </div>
  );
};

export default PortalSelector;
