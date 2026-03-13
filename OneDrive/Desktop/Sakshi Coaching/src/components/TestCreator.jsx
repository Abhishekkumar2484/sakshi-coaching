import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Trash2, Save, Send, ClipboardList, AlertCircle } from 'lucide-react';

const TestCreator = () => {
  const { t, language } = useLanguage();
  const [questions, setQuestions] = useState([
    { id: 1, text: '', options: ['', '', '', ''], correct: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto py-10">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-10"
      >
        <div className="flex items-center gap-8">
             <div className="w-20 h-20 bg-white text-purple-600 rounded-[2rem] flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] rotate-[-5deg] border border-purple-100">
                <ClipboardList size={40} strokeWidth={2.5} />
             </div>
             <div>
                <h2 className="text-5xl font-black text-zinc-900 font-heading tracking-tighter uppercase italic">
                  {language === 'en' ? 'TEST FORGE' : 'टेस्ट फोर्ज'}
                </h2>
                <p className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.5em] mt-2 opacity-80">{language === 'en' ? 'Engineering Knowledge' : 'इंजीनियरिंग नॉलेज'}</p>
             </div>
        </div>
        <div className="flex gap-6">
          <button className="flex items-center gap-4 px-10 py-5 bg-white border-2 border-purple-100 rounded-[2rem] font-black uppercase text-[10px] tracking-widest text-zinc-400 hover:border-purple-300 hover:text-purple-600 transition-all active:scale-95 shadow-sm">
            <Save size={20} /> {language === 'en' ? 'Draft' : 'ड्राफ्ट'}
          </button>
          <button className="flex items-center gap-4 px-10 py-5 bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:from-purple-600 hover:to-fuchsia-600 transition-all shadow-lg shadow-purple-500/20 active:scale-95 border-b-4 border-purple-700 hover:border-b-0 hover:mt-1 hover:mb-[-1px]">
            <Send size={20} /> {language === 'en' ? 'Broadcast' : 'ब्रॉडकास्ट'}
          </button>
        </div>
      </motion.div>

      <div className="space-y-12">
        <AnimatePresence initial={false}>
          {questions.map((q, qIndex) => (
            <motion.div 
              key={q.id} 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/90 backdrop-blur-2xl p-14 rounded-[4rem] shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)] border border-purple-100 relative group hover:border-purple-300 transition-all"
            >
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                onClick={() => removeQuestion(q.id)}
                className="absolute -top-4 -right-4 w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center border border-rose-200 shadow-lg opacity-0 group-hover:opacity-100 transition-all active:scale-90 z-20 hover:bg-rose-500 hover:text-white"
              >
                <Trash2 size={24} />
              </motion.button>

              <div className="mb-12">
                <div className="flex items-center gap-5 mb-6">
                   <span className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-black text-xl border border-purple-100 shadow-sm italic tracking-tighter">
                     #{qIndex + 1}
                   </span>
                   <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.4em] italic leading-none">Intelligence Query</label>
                </div>
                <textarea 
                  className="w-full p-10 rounded-[3rem] bg-slate-50 border-2 border-transparent outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-100/50 transition-all duration-500 text-2xl font-black text-zinc-800 shadow-inner uppercase italic tracking-tighter placeholder:text-zinc-300"
                  placeholder={language === 'en' ? 'ENUNCIATE QUESTION...' : 'प्रश्न स्पष्ट रूप से लिखें...'}
                  rows="2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {q.options.map((opt, optIndex) => (
                  <div 
                    key={optIndex} 
                    onClick={() => {
                        const newQs = [...questions];
                        newQs[qIndex].correct = optIndex;
                        setQuestions(newQs);
                    }}
                    className={`flex items-center gap-6 p-8 rounded-[2.5rem] transition-all duration-500 cursor-pointer relative border-2 ${q.correct === optIndex ? 'bg-purple-50 border-purple-400 shadow-[0_8px_30px_rgb(168,85,247,0.15)] scale-[1.02] z-10' : 'bg-slate-50 border-transparent hover:border-purple-200 hover:bg-white shadow-sm'}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-base transition-all ${q.correct === optIndex ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-md' : 'bg-white text-zinc-400 border border-slate-200'}`}>
                      {String.fromCharCode(65 + optIndex)}
                    </div>
                    <input 
                      type="text" 
                      className={`flex-grow bg-transparent border-none outline-none font-black text-xl uppercase tracking-tighter ${q.correct === optIndex ? 'text-purple-700 placeholder-purple-300' : 'text-zinc-700 placeholder-zinc-300'}`}
                      placeholder={`Choice ${String.fromCharCode(65 + optIndex)}`}
                    />
                    <div className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${q.correct === optIndex ? 'border-purple-500 bg-white' : 'border-slate-300 bg-slate-100'}`}>
                        {q.correct === optIndex && <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t-2 border-dashed border-purple-100 flex items-center gap-3 text-purple-400/80">
                 <AlertCircle size={20} />
                 <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">Neural Engine will validate against Choice {String.fromCharCode(65 + q.correct)}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.button 
        layout
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
        onClick={addQuestion}
        className="w-full py-10 border-4 border-dashed border-purple-200 rounded-[4rem] text-purple-400 font-black text-2xl uppercase tracking-[0.5em] flex items-center justify-center gap-6 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50/50 transition-all duration-500 group relative overflow-hidden bg-slate-50/50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-fuchsia-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Plus className="group-hover:rotate-180 transition-transform duration-700 w-14 h-14 bg-white border border-purple-100 rounded-3xl shadow-sm text-purple-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-fuchsia-500 group-hover:border-transparent p-3 relative z-10" /> 
        <span className="relative z-10">{language === 'en' ? 'EXPAND KNOWLEDGE BASE' : 'ज्ञान आधार का विस्तार करें'}</span>
      </motion.button>
    </div>
  );
};

export default TestCreator;
