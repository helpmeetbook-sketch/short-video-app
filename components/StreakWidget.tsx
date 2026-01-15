
import React from 'react';
import { Flame, ShieldAlert, Zap } from 'lucide-react';
import { User } from '../types';
import { buyStreakFreeze, STREAK_FREEZE_COST } from '../services/streakService';

interface StreakWidgetProps {
  user: User;
  onUpdate: (user: User) => void;
}

const StreakWidget: React.FC<StreakWidgetProps> = ({ user, onUpdate }) => {
  return (
    <div className="bg-zinc-900/90 border border-[#00FF9D]/20 p-6 rounded-[2rem] shadow-[0_0_20px_rgba(0,255,157,0.05)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#FF007A]/10 border border-[#FF007A]/30 rounded-2xl flex items-center justify-center text-[#FF007A] shadow-[0_0_15px_rgba(255,0,122,0.2)]">
            <Flame size={32} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">{user.streakCount} Day Streak</h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Don't let it go cold!</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#00FF9D] font-black text-xs uppercase tracking-tighter flex items-center gap-1">
            <Zap size={12} fill="currentColor" /> Active
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-[#00FF9D]" size={20} />
          <div>
            <p className="text-xs font-bold text-white">Streak Freezes: {user.streakFreezes}</p>
            <p className="text-[10px] text-zinc-500">Auto-saves your streak</p>
          </div>
        </div>
        <button 
          onClick={() => onUpdate(buyStreakFreeze(user))}
          disabled={user.xp < STREAK_FREEZE_COST}
          className="bg-[#00FF9D] hover:bg-[#00FF9D]/80 disabled:bg-zinc-800 disabled:text-zinc-600 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
        >
          Buy for {STREAK_FREEZE_COST} XP
        </button>
      </div>
    </div>
  );
};

export default StreakWidget;
