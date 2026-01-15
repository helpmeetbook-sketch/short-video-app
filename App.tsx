
import React, { useState, useCallback, useEffect } from 'react';
import { User, Video, Category, UserNote } from './types';
import { MOCK_VIDEOS, XP_PER_WATCH, XP_PER_LIKE, XP_QUIZ_BONUS } from './constants';
import VideoPlayer from './components/VideoPlayer';
import GamificationWidget from './components/GamificationWidget';
import CreatorStudio from './components/CreatorStudio';
import Leaderboard from './components/Leaderboard';
import CreatorDashboard from './components/CreatorDashboard';
import Inbox from './components/Inbox';
import StreakWidget from './components/StreakWidget';
import AndroidInstallPrompt from './components/AndroidInstallPrompt';
import Onboarding from './components/Onboarding';
import SupportModal from './components/SupportModal';
import { processStreak } from './services/streakService';
import { Home, Search, PlusSquare, User as UserIcon, Trophy, MessageSquare, Settings as SettingsIcon, ChevronLeft, FileText, ListChecks, Lightbulb, ChevronRight, Zap, Users, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 'u1',
    username: 'LearnerOne',
    avatar: 'https://picsum.photos/seed/learner/100/100',
    xp: 750,
    level: 8,
    isCreator: true,
    following: [],
    interestWeights: {},
    watchedVideoIds: [],
    notes: [
      { videoId: 'v1', videoTitle: 'React Hooks Mastery', timestamp: 45, note: 'useEffect is for side effects. Don\'t forget dependencies!' },
      { videoId: 'v2', videoTitle: 'Color Theory 101', timestamp: 12, note: 'Complementary colors are opposite on the wheel.' }
    ],
    streakCount: 5,
    lastActiveDate: new Date().toISOString().split('T')[0],
    streakFreezes: 1,
    onboardingCompleted: false, // Start false for "Real" app flow
    walletBalance: 240
  });

  const [activeTab, setActiveTab] = useState<'feed' | 'profile' | 'courses' | 'leaderboard' | 'inbox' | 'search' | 'creator_view'>('feed');
  const [isCreatorStudioOpen, setIsCreatorStudioOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [expandedHub, setExpandedHub] = useState<'summary' | 'note' | 'tip' | 'creator' | null>(null);
  const [supportCreator, setSupportCreator] = useState<string | null>(null);

  useEffect(() => {
    setUser(prev => processStreak(prev));
  }, []);

  const handleAction = useCallback((type: 'LIKE' | 'SAVE' | 'WATCH' | 'TIP' | 'QUIZ_CORRECT' | 'SUPPORT' | 'SHARE', creatorName?: string) => {
    if (type === 'TIP' && creatorName) {
      setSupportCreator(creatorName);
      return;
    }
    
    setUser(prev => {
      let addedXp = 0;
      switch (type) {
        case 'WATCH': addedXp = XP_PER_WATCH; break;
        case 'LIKE': addedXp = XP_PER_LIKE; break;
        case 'SAVE': addedXp = 10; break;
        case 'SUPPORT': addedXp = 25; break;
        case 'QUIZ_CORRECT': addedXp = XP_QUIZ_BONUS; break;
        case 'SHARE': addedXp = 5; break;
      }
      return { ...prev, xp: prev.xp + addedXp };
    });
  }, []);

  if (!user.onboardingCompleted) {
    return (
      <Onboarding 
        onComplete={(interests) => {
          const weights: Record<string, number> = {};
          interests.forEach(cat => weights[cat] = 100);
          setUser(prev => ({ ...prev, onboardingCompleted: true, interestWeights: weights }));
        }} 
      />
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white overflow-hidden relative selection:bg-[#00FF9D]/30">
      
      <AndroidInstallPrompt />

      {supportCreator && (
        <SupportModal 
          creatorName={supportCreator} 
          onClose={() => setSupportCreator(null)} 
          onSuccess={() => handleAction('SUPPORT')}
        />
      )}

      {activeTab === 'feed' && (
        <div className="absolute top-10 right-6 z-[60]">
          <button onClick={() => setActiveTab('search')} className="w-12 h-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all hover:border-[#00FF9D]/50 shadow-2xl">
            <Search size={24} />
          </button>
        </div>
      )}

      {/* Full-Featured Settings Hub */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-[#050505] z-[200] animate-in slide-in-from-right duration-500 flex flex-col">
          <header className="p-6 pt-14 flex items-center justify-between border-b border-white/5 bg-black/90 backdrop-blur-3xl sticky top-0 z-50">
            <button 
              onClick={() => { if(expandedHub) setExpandedHub(null); else setIsSettingsOpen(false); }} 
              className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-zinc-400 hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft size={28} />
            </button>
            <div className="flex flex-col items-center">
               <h2 key={expandedHub || 'default'} className="text-xl font-black tracking-tight uppercase text-white animate-title-pop">
                  {expandedHub === 'summary' ? 'AI Summaries' : 
                   expandedHub === 'note' ? 'My Study Notes' : 
                   expandedHub === 'tip' ? 'Genius Tips' : 
                   expandedHub === 'creator' ? 'Creator Hub' : 'Settings'}
               </h2>
               {!expandedHub && <span className="text-[9px] font-bold text-[#00FF9D] uppercase tracking-[0.2em] opacity-80">Management Console</span>}
            </div>
            <div className="w-12" />
          </header>
          
          <div className="flex-1 overflow-y-auto pb-32">
            {!expandedHub ? (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <button onClick={() => setExpandedHub('creator')} className="w-full flex items-center justify-between p-6 bg-zinc-900/40 rounded-[2rem] border border-orange-500/10 active:scale-95 transition-all group overflow-hidden relative">
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500 shadow-lg shadow-orange-500/20">
                        <Zap size={24} />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-white">Creator Dashboard</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">Earnings & Stats</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-zinc-700 group-hover:text-orange-500 transition-colors" />
                  </button>

                  <button onClick={() => setExpandedHub('summary')} className="w-full flex items-center justify-between p-6 bg-zinc-900/40 rounded-[2rem] border border-[#00FF9D]/10 active:scale-95 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00FF9D]/20 rounded-xl flex items-center justify-center text-[#00FF9D] shadow-lg shadow-[#00FF9D]/20">
                        <ListChecks size={24} />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-white">AI Summaries</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">Key Points AI</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-zinc-700 group-hover:text-[#00FF9D] transition-colors" />
                  </button>

                  <button onClick={() => setExpandedHub('note')} className="w-full flex items-center justify-between p-6 bg-zinc-900/40 rounded-[2rem] border border-[#FF007A]/10 active:scale-95 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FF007A]/20 rounded-xl flex items-center justify-center text-[#FF007A] shadow-lg shadow-[#FF007A]/20">
                        <FileText size={24} />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-white">My Study Notes</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">Personal Vault</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-zinc-700 group-hover:text-[#FF007A] transition-colors" />
                  </button>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-3">
                   <button className="w-full flex items-center gap-3 p-5 text-red-500 font-bold text-sm uppercase text-left">
                      <LogOut size={18} />
                      Logout
                   </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {expandedHub === 'creator' && <CreatorDashboard />}
                {expandedHub === 'summary' && (
                  <div className="p-6 space-y-5">
                    {MOCK_VIDEOS.map(v => (
                      <div key={v.id} className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5 border-l-4 border-l-[#00FF9D]">
                        <h4 className="text-xs font-black text-[#00FF9D] uppercase mb-3">@{v.creatorName} Insights</h4>
                        <ul className="space-y-3">
                          {['Concept Breakdown', 'Common Errors', 'Speed Hacks'].map((s, i) => (
                            <li key={i} className="text-sm text-zinc-300 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {expandedHub === 'note' && (
                  <div className="p-6 space-y-4">
                    {user.notes.map((n, i) => (
                      <div key={i} className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5 border-l-4 border-l-[#FF007A]">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[10px] font-black text-zinc-500 uppercase">{n.videoTitle}</p>
                          <span className="text-[10px] bg-[#FF007A]/10 text-[#FF007A] px-2 py-0.5 rounded-md">{n.timestamp}s</span>
                        </div>
                        <p className="text-zinc-200 font-medium italic">"{n.note}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 overflow-hidden relative">
        {activeTab === 'feed' && (
          <div className="h-full w-full snap-y-scroll bg-black">
            {MOCK_VIDEOS.map((video) => (
              <VideoPlayer key={video.id} video={video as Video} user={user} onAction={handleAction} />
            ))}
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="h-full w-full overflow-y-auto p-6 pb-32 space-y-8 bg-zinc-950">
            <header className="flex items-center justify-between pt-12">
              <button onClick={() => setActiveTab('feed')} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-zinc-400 hover:text-white transition-all"><ChevronLeft size={28} /></button>
              <button 
                onClick={() => setIsSettingsOpen(true)} 
                className="w-12 h-12 relative flex items-center justify-center rounded-2xl active:scale-90 transition-all group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF007A] via-[#00FF9D] to-blue-500 rounded-2xl opacity-80 rainbow-border" />
                <div className="absolute inset-[2px] bg-zinc-950 rounded-[0.9rem] flex items-center justify-center">
                   <SettingsIcon size={24} className="text-white animate-slow-spin group-hover:scale-110 transition-transform" />
                </div>
              </button>
            </header>

            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-[2rem] border-4 border-[#FF007A] p-1 shadow-2xl">
                  <img src={user.avatar} className="w-full h-full rounded-[1.6rem] object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#00FF9D] text-black w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border-4 border-zinc-950 shadow-lg">
                  {user.level}
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase text-left">{user.username}</h1>
                <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-1 text-left">Sage Apprentice • SkillFlash</p>
              </div>
            </div>
            <StreakWidget user={user} onUpdate={setUser} />
            <GamificationWidget user={user} />
          </div>
        )}
        {activeTab === 'leaderboard' && <Leaderboard onBack={() => setActiveTab('feed')} />}
        {activeTab === 'inbox' && <Inbox onBack={() => setActiveTab('feed')} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-3xl border-t border-white/5 px-2 py-3 flex items-center justify-around z-50 safe-pb">
        <button onClick={() => setActiveTab('feed')} className={`flex flex-col items-center gap-1 transition-all active:scale-90 w-16 ${activeTab === 'feed' ? 'text-[#00FF9D]' : 'text-zinc-600'}`}>
          <Home size={24} />
          <span className="text-[10px] font-black uppercase tracking-tight">Home</span>
        </button>
        <button onClick={() => setActiveTab('leaderboard')} className={`flex flex-col items-center gap-1 transition-all active:scale-90 w-16 ${activeTab === 'leaderboard' ? 'text-[#FF007A]' : 'text-zinc-600'}`}>
          <Users size={24} />
          <span className="text-[10px] font-black uppercase tracking-tight">Friends</span>
        </button>
        <div className="relative -top-6">
          <button onClick={() => setIsCreatorStudioOpen(true)} className="bg-white text-black w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(255,255,255,0.2)] active:scale-95 transition-all hover:bg-[#00FF9D]">
            <PlusSquare size={26} />
            <span className="text-[8px] font-black uppercase mt-0.5">Post</span>
          </button>
        </div>
        <button onClick={() => setActiveTab('inbox')} className={`flex flex-col items-center gap-1 transition-all active:scale-90 w-16 ${activeTab === 'inbox' ? 'text-blue-400' : 'text-zinc-600'}`}>
          <MessageSquare size={24} />
          <span className="text-[10px] font-black uppercase tracking-tight">Inbox</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 transition-all active:scale-90 w-16 ${activeTab === 'profile' ? 'text-white' : 'text-zinc-600'}`}>
          <UserIcon size={24} />
          <span className="text-[10px] font-black uppercase tracking-tight">Profile</span>
        </button>
      </nav>

      {isCreatorStudioOpen && <CreatorStudio onClose={() => setIsCreatorStudioOpen(false)} />}
    </div>
  );
};

export default App;
