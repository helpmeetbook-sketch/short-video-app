
import React from 'react';
import { User } from '../types';
import { calculateLevel, getProgressToNextLevel, getLevelTitle } from '../services/gamificationService';
import { Zap, Trophy, Flame } from 'lucide-react';

interface GamificationWidgetProps {
  user: User;
}

const GamificationWidget: React.FC<GamificationWidgetProps> = ({ user }) => {
  const level = calculateLevel(user.xp);
  const progress = getProgressToNextLevel(user.xp);
  const title = getLevelTitle(level);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-orange-500/20">
              {level}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-zinc-900 border border-white/10 rounded-full p-1">
              <Zap size={14} className="text-yellow-400 fill-current" />
            </div>
          </div>
          <div>
            <h4 className="text-sm text-gray-400 font-semibold uppercase tracking-widest mb-0.5">Current Rank</h4>
            <h2 className="text-2xl font-extrabold text-white">{title}</h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-white">{user.xp}</p>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total XP</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
          <span className="text-gray-400">Level {level}</span>
          <span className="text-yellow-400">{Math.floor(progress)}% to Level {level + 1}</span>
        </div>
        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center text-center">
          <Flame className="text-orange-500 mb-1" size={20} />
          <span className="text-[10px] font-bold text-gray-400 uppercase">3 Day Streak</span>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center text-center">
          <Trophy className="text-yellow-400 mb-1" size={20} />
          <span className="text-[10px] font-bold text-gray-400 uppercase">12 Badges</span>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center text-center">
          <Zap className="text-blue-400 mb-1" size={20} />
          <span className="text-[10px] font-bold text-gray-400 uppercase">Top 10%</span>
        </div>
      </div>
    </div>
  );
};

export default GamificationWidget;
