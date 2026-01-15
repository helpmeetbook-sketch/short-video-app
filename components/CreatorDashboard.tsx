
import React from 'react';
import { BarChart3, Users, Wallet, Zap, ArrowUpRight, Coffee } from 'lucide-react';

const CreatorDashboard: React.FC = () => {
  const stats = {
    totalViews: 124500,
    xpGenerated: 45000,
    walletBalance: 842.50,
    growthRate: 12.5
  };

  return (
    <div className="h-full w-full overflow-y-auto p-6 pb-24 space-y-8 bg-zinc-950">
      <div className="pt-8">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          Creator Studio <Zap className="text-yellow-400 fill-current" />
        </h1>
        <p className="text-gray-400 mt-2">Manage your impact and earnings.</p>
      </div>

      {/* Wallet Card */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Wallet size={120} />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Available Balance</p>
          <h2 className="text-5xl font-black text-white mb-6">${stats.walletBalance.toFixed(2)}</h2>
          <div className="flex gap-3">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold text-sm uppercase flex items-center gap-2">
              Withdraw Funds <ArrowUpRight size={16} />
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold text-sm uppercase">History</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5">
          <BarChart3 className="text-blue-400 mb-4" />
          <p className="text-2xl font-black text-white">{stats.totalViews.toLocaleString()}</p>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Total Views</p>
          <div className="mt-2 text-[10px] text-green-400 font-bold">+12% this week</div>
        </div>
        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5">
          <Zap className="text-yellow-400 mb-4" />
          <p className="text-2xl font-black text-white">{(stats.xpGenerated / 1000).toFixed(1)}k</p>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">XP Generated</p>
          <div className="mt-2 text-[10px] text-yellow-400 font-bold">Top 5% Educator</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white/5 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500">
                  <Coffee size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">New Tip from @Learner{i}</p>
                  <p className="text-xs text-zinc-500">Bought you a coffee!</p>
                </div>
              </div>
              <span className="font-bold text-green-400">+$5.00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
