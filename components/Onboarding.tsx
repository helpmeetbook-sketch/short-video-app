
import React, { useState } from 'react';
import { Category } from '../types';
import { Check, Sparkles, Rocket } from 'lucide-react';

interface OnboardingProps {
  onComplete: (interests: Category[]) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<Category[]>([]);
  
  const categories = Object.values(Category);

  const toggle = (cat: Category) => {
    setSelected(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-[500] flex flex-col p-8 items-center justify-center text-center">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#00FF9D]/20 to-transparent opacity-50" />
      
      <div className="w-20 h-20 bg-gradient-to-tr from-[#00FF9D] to-blue-500 rounded-[2rem] flex items-center justify-center text-black mb-8 shadow-[0_0_50px_rgba(0,255,157,0.3)] animate-bounce">
        <Rocket size={40} />
      </div>

      <h1 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase leading-none">
        Pick Your <span className="text-[#00FF9D]">Skills</span>
      </h1>
      <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-10">
        Choose 2 or more to start learning
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={`p-6 rounded-[2rem] border-2 transition-all duration-300 relative overflow-hidden group ${
              selected.includes(cat) 
                ? 'bg-[#00FF9D] border-[#00FF9D] text-black scale-95' 
                : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <span className="font-black text-sm uppercase tracking-tight relative z-10">{cat}</span>
            {selected.includes(cat) && (
              <div className="absolute top-2 right-2">
                <Check size={16} strokeWidth={4} />
              </div>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => selected.length >= 2 && onComplete(selected)}
        disabled={selected.length < 2}
        className={`w-full max-w-sm py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all ${
          selected.length >= 2 
            ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)] active:scale-95' 
            : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
        }`}
      >
        Start Learning
      </button>
      
      <p className="mt-8 text-[10px] text-zinc-600 font-bold uppercase tracking-widest flex items-center gap-2">
        <Sparkles size={12} /> Powered by SkillFlash AI
      </p>
    </div>
  );
};

export default Onboarding;
