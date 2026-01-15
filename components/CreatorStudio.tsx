
import React, { useState } from 'react';
import { Camera, Video, Type, Hash, Upload, X, Sparkles, Wand2 } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { generateAIVideoMetadata } from '../services/contentService';

const CreatorStudio: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleAiMagic = async () => {
    if (!description) return;
    setIsGenerating(true);
    const result = await generateAIVideoMetadata(description);
    if (result) {
      setAiResult(result);
      setTags(result.tags.join(', '));
    }
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 bg-black z-[400] flex flex-col animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center justify-between p-6 pt-12 border-b border-white/10">
        <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-white active:scale-90 transition-all"><X size={24} /></button>
        <h1 className="text-xl font-black uppercase tracking-tighter">Creator Studio</h1>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {step === 1 ? (
          <div className="space-y-8">
            <div className="text-center space-y-4 py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-dashed border-zinc-700 rounded-[2.5rem] flex items-center justify-center mx-auto text-zinc-600">
                <Video size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white leading-none">POST A FLASH</h2>
                <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mt-2">Max 60 seconds of knowledge</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => setStep(2)} className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between active:scale-95 transition-all group overflow-hidden relative">
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-14 h-14 bg-[#00FF9D]/10 rounded-2xl flex items-center justify-center text-[#00FF9D]">
                    <Upload size={28} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-white text-lg">UPLOAD FILE</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">From your gallery</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="aspect-[9/16] max-h-[300px] bg-zinc-900 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center border border-white/10">
              <img src="https://picsum.photos/seed/flash/400/700" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">Change Thumbnail</button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 block">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-[2rem] p-6 focus:ring-2 focus:ring-[#00FF9D] outline-none text-sm resize-none text-white font-medium"
                  rows={4}
                  placeholder="What are you teaching today? Be descriptive for AI Magic..."
                />
                
                <button 
                  onClick={handleAiMagic}
                  disabled={!description || isGenerating}
                  className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-xl shadow-lg hover:bg-[#00FF9D] transition-all disabled:opacity-30 flex items-center gap-2"
                >
                  <Wand2 size={16} className={isGenerating ? 'animate-spin' : ''} />
                  <span className="text-[10px] font-black uppercase">AI Magic</span>
                </button>
              </div>

              {aiResult && (
                <div className="p-6 bg-[#00FF9D]/10 rounded-[2rem] border border-[#00FF9D]/20 animate-in fade-in slide-in-from-top-4">
                  <h4 className="text-[10px] font-black text-[#00FF9D] uppercase mb-4 flex items-center gap-2">
                    <Sparkles size={12} /> AI Suggestions Generated
                  </h4>
                  <div className="space-y-3">
                     <p className="text-xs font-bold text-white"><span className="text-[#00FF9D]">Pro Tip:</span> {aiResult.tip}</p>
                     <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <p className="text-[10px] font-black uppercase text-zinc-500 mb-1">Generated Quiz</p>
                        <p className="text-xs text-zinc-200">{aiResult.quiz.question}</p>
                     </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 block">Category</label>
                <select className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl p-5 focus:ring-2 focus:ring-[#00FF9D] outline-none text-sm appearance-none text-white font-bold">
                  {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 block">Tags</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl p-5 pl-12 focus:ring-2 focus:ring-[#00FF9D] outline-none text-sm text-white font-bold"
                    placeholder="coding, design, finance"
                  />
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                </div>
              </div>

              <button className="w-full bg-[#00FF9D] text-black py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-[#00FF9D]/80 transition-all mt-8 shadow-[0_20px_40px_rgba(0,255,157,0.2)] active:scale-95">
                Publish Flash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorStudio;
