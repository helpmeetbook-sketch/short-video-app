
import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone, MoreVertical, PlusSquare } from 'lucide-react';

const AndroidInstallPrompt: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if it's Android and not already installed
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isAndroid && !isStandalone) {
      const timer = setTimeout(() => setShow(true), 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-[300] animate-in slide-in-from-bottom duration-500">
      <div className="bg-zinc-900 border border-white/10 p-5 rounded-[2rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FF9D] to-blue-500" />
        
        <button 
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#00FF9D]/20 rounded-2xl flex items-center justify-center text-[#00FF9D]">
            <Smartphone size={24} />
          </div>
          <div>
            <h3 className="font-black text-white leading-tight">Install SkillFlash App</h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Better experience on Android</p>
          </div>
        </div>

        <div className="bg-black/40 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <div className="w-6 h-6 bg-zinc-800 rounded-lg flex items-center justify-center text-white"><MoreVertical size={14} /></div>
            <span>Tap the 3 dots in your browser menu</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <div className="w-6 h-6 bg-zinc-800 rounded-lg flex items-center justify-center text-white"><PlusSquare size={14} /></div>
            <span>Select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong></span>
          </div>
        </div>

        <button 
          onClick={() => setShow(false)}
          className="w-full mt-4 bg-white text-black py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#00FF9D] transition-colors flex items-center justify-center gap-2"
        >
          <Download size={14} strokeWidth={3} />
          Got it
        </button>
      </div>
    </div>
  );
};

export default AndroidInstallPrompt;
