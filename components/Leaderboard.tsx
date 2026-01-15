
import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';
import { Trophy, Users, TrendingUp, ChevronLeft } from 'lucide-react';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const sorted = [...MOCK_LEADERBOARD].sort((a, b) => b.xp - a.xp);

  return (
    <div className="h-full w-full overflow-y-auto p-6 pb-24 space-y-8 bg-zinc-950">
      <div className="pt-12 flex flex-col gap-6">
        <button 
          onClick={onBack} 
          className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-zinc-400 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={28} />
        </button>
        
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            Learning Buddies <Users className="text-blue-400" />
          </h1>
          <p className="text-gray-400 mt-2">See how you rank against your study circle this week.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sorted.slice(0, 3).map((user, i) => (
          <div key={user.id} className={`flex flex-col items-center p-4 rounded-3xl border ${i === 0 ? 'bg-yellow-400/10 border-yellow-400/50' : 'bg-zinc-900 border-white/5'}`}>
            <div className="relative mb-3">
              <img src={user.avatar} className="w-16 h-16 rounded-full border-2 border-white/20" />
              <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${i === 0 ? 'bg-yellow-400 text-black' : i === 1 ? 'bg-zinc-300 text-black' : 'bg-orange-500 text-white'}`}>
                {i + 1}
              </div>
            </div>
            <span className="font-bold text-xs truncate w-full text-center">{user.username}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">{user.xp} XP</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          Global Ranking <TrendingUp size={14} />
        </h3>
        {sorted.map((user, i) => (
          <div key={user.id} className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-zinc-600 font-bold w-4">{i + 1}</span>
              <img src={user.avatar} className="w-10 h-10 rounded-full" />
              <span className="font-bold text-white">{user.username}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-white">{user.xp}</div>
              <div className="text-[10px] text-zinc-500 font-bold">XP EARNED</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
