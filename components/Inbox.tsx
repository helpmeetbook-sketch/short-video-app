
import React from 'react';
import { Search, MessageSquare, Users, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

interface InboxProps {
  onBack: () => void;
}

const Inbox: React.FC<InboxProps> = ({ onBack }) => {
  const messages = [
    { id: 1, user: 'SkillMaster', avatar: 'https://picsum.photos/seed/p4/100/100', text: 'Hey, did you finish the React Quiz yet? 🔥', time: '2m', unread: true },
    { id: 2, user: 'EduGenZ', avatar: 'https://picsum.photos/seed/p3/100/100', text: 'Thanks for the tip on Color Theory! 🙌', time: '1h', unread: false },
    { id: 3, user: 'KnowledgeSeeker', avatar: 'https://picsum.photos/seed/p2/100/100', text: 'Let\'s collaborate on the next project.', time: '3h', unread: false },
    { id: 4, user: 'FutureDev', avatar: 'https://picsum.photos/seed/p5/100/100', text: 'Check out this new tutorial I found!', time: 'Yesterday', unread: false }
  ];

  const activities = [
    { id: 1, icon: <Users className="text-blue-400" />, label: 'New Followers', count: 12 },
    { id: 2, icon: <Sparkles className="text-[#FF007A]" />, label: 'System Alerts', count: 2 }
  ];

  return (
    <div className="h-full w-full bg-zinc-950 flex flex-col">
      <header className="pt-14 p-6 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack} 
            className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-zinc-400 hover:text-white transition-all active:scale-90"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-3xl font-black text-white tracking-tighter">Inbox</h1>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search buddies..." 
            className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Activity Buttons */}
        <div className="grid grid-cols-2 gap-4 p-6 border-b border-white/5">
          {activities.map(act => (
            <button key={act.id} className="bg-zinc-900/50 border border-white/5 p-4 rounded-3xl flex items-center gap-3 active:scale-95 transition-transform">
              <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center">
                {act.icon}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{act.label}</p>
                <p className="text-lg font-black text-white">{act.count}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Message List */}
        <div className="p-2">
          {messages.map(msg => (
            <button key={msg.id} className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-[2rem] transition-colors group relative">
              <div className="relative">
                <img src={msg.avatar} className="w-16 h-16 rounded-3xl border border-white/10" alt="" />
                {msg.unread && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF007A] border-4 border-zinc-950 rounded-full" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-white tracking-tight">@{msg.user}</h4>
                  <span className="text-[10px] font-bold text-zinc-500">{msg.time}</span>
                </div>
                <p className={`text-sm truncate ${msg.unread ? 'text-zinc-100 font-bold' : 'text-zinc-500'}`}>
                  {msg.text}
                </p>
              </div>
              <ChevronRight size={18} className="text-zinc-800 group-hover:text-zinc-400 transition-colors" />
            </button>
          ))}
        </div>

        {/* Empty State / Footer */}
        <div className="p-10 text-center space-y-2 opacity-30">
          <MessageSquare size={40} className="mx-auto text-zinc-600" />
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">End of Inbox</p>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
