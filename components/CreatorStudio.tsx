
import React, { useState } from 'react';
import { Camera, Video, Type, Hash, Upload, X } from 'lucide-react';
import { CATEGORIES } from '../constants';

const CreatorStudio: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <button onClick={onClose} className="p-2 text-white"><X size={24} /></button>
        <h1 className="text-lg font-bold">Creator Studio</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {step === 1 ? (
          <div className="space-y-8">
            <div className="text-center space-y-4 py-10">
              <div className="w-24 h-24 bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-full flex items-center justify-center mx-auto">
                <Video size={40} className="text-zinc-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Share your knowledge</h2>
                <p className="text-gray-400 mt-2">Upload a vertical video up to 60 seconds.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-zinc-900 p-6 rounded-3xl flex flex-col items-center gap-3 border border-white/5 hover:border-yellow-400/50 transition-colors">
                <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-500">
                  <Camera size={24} />
                </div>
                <span className="font-bold">Record</span>
              </button>
              <button 
                onClick={() => setStep(2)}
                className="bg-zinc-900 p-6 rounded-3xl flex flex-col items-center gap-3 border border-white/5 hover:border-yellow-400/50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                  <Upload size={24} />
                </div>
                <span className="font-bold">Upload</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="aspect-[9/16] bg-zinc-900 rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/10">
              <img src="https://picsum.photos/seed/thumb/400/700" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/20">Change Thumbnail</button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Caption</label>
                <textarea 
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-yellow-400 outline-none text-sm resize-none"
                  rows={3}
                  placeholder="Explain your skill in a few words..."
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Category</label>
                <select className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-yellow-400 outline-none text-sm appearance-none">
                  {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Tags (comma separated)</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                    placeholder="e.g. coding, finance, design"
                  />
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>

              <button className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-colors mt-6 shadow-xl shadow-yellow-400/20">
                Publish Video
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorStudio;
