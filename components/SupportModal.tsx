
import React, { useState } from 'react';
import { X, Coffee, Heart, Zap, ChevronRight, Check } from 'lucide-react';

interface SupportModalProps {
  creatorName: string;
  onClose: () => void;
  onSuccess: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ creatorName, onClose, onSuccess }) => {
  const [amount, setAmount] = useState<number>(100);
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Card' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[500] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><X size={24} /></button>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#FF007A]/20 rounded-2xl flex items-center justify-center text-[#FF007A] shadow-[0_0_20px_rgba(255,0,122,0.2)]">
            <Coffee size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Tip @{creatorName}</h2>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Support the creator</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[50, 100, 500].map(val => (
            <button 
              key={val} 
              onClick={() => setAmount(val)}
              className={`py-4 rounded-2xl font-black transition-all border ${
                amount === val ? 'bg-[#FF007A] border-[#FF007A] text-white' : 'bg-white/5 border-white/5 text-zinc-400'
              }`}
            >
              ৳{val}
            </button>
          ))}
        </div>

        <div className="space-y-3 mb-8">
          <button 
            onClick={() => setMethod('bKash')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
              method === 'bKash' ? 'bg-[#D12053]/10 border-[#D12053]' : 'bg-white/5 border-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#D12053] rounded-lg flex items-center justify-center text-[10px] font-black text-white uppercase">b</div>
              <span className="font-bold text-sm text-white">bKash</span>
            </div>
            {method === 'bKash' && <Check size={18} className="text-[#D12053]" />}
          </button>

          <button 
            onClick={() => setMethod('Nagad')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
              method === 'Nagad' ? 'bg-orange-500/10 border-orange-500' : 'bg-white/5 border-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-[10px] font-black text-white uppercase">n</div>
              <span className="font-bold text-sm text-white">Nagad</span>
            </div>
            {method === 'Nagad' && <Check size={18} className="text-orange-500" />}
          </button>
        </div>

        <button
          onClick={handlePay}
          disabled={!method || isProcessing}
          className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all ${
            method && !isProcessing 
              ? 'bg-[#FF007A] text-white shadow-[0_10px_30px_rgba(255,0,122,0.3)] active:scale-95' 
              : 'bg-zinc-800 text-zinc-600'
          }`}
        >
          {isProcessing ? 'Processing...' : `Pay ৳${amount}`}
        </button>
      </div>
    </div>
  );
};

export default SupportModal;
