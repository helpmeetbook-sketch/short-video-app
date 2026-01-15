
import React, { useState, useEffect, useRef } from 'react';
import { Video, User } from '../types';
import { Heart, Bookmark, Coffee, MessageCircle, X, Send, Share2, UserPlus } from 'lucide-react';
import QuizModal from './QuizModal';

interface VideoPlayerProps {
  video: Video;
  user: User;
  onAction: (type: 'LIKE' | 'SAVE' | 'WATCH' | 'TIP' | 'QUIZ_CORRECT' | 'SUPPORT' | 'SHARE') => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, user, onAction }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSupporting, setIsSupporting] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [comments] = useState([
    { id: 1, user: 'DevKing', text: 'This explanation is so clear! 🚀', likes: 12 },
    { id: 2, user: 'SkillSeeker', text: 'Can you do a video on Advanced Hooks next?', likes: 5 }
  ]);

  const shareUsers = [
    { id: 'u2', name: 'KnowledgeSeeker', avatar: 'https://picsum.photos/seed/p2/100/100' },
    { id: 'u3', name: 'EduGenZ', avatar: 'https://picsum.photos/seed/p3/100/100' },
    { id: 'u4', name: 'SkillMaster', avatar: 'https://picsum.photos/seed/p4/100/100' },
    { id: 'u5', name: 'FutureDev', avatar: 'https://picsum.photos/seed/p5/100/100' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
          onAction('WATCH');
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
          setShowQuiz(false);
        }
      },
      { threshold: 0.8 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [onAction]);

  const handleSupport = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSupporting(!isSupporting);
    if (!isSupporting) onAction('SUPPORT');
  };

  return (
    <div className="relative w-full h-full bg-black snap-start-card flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={video.url}
        loop={!video.quiz}
        onEnded={() => video.quiz && setShowQuiz(true)}
        muted
        playsInline
        className="w-full h-full object-cover"
        onClick={() => {
          if (isPlaying) videoRef.current?.pause();
          else videoRef.current?.play();
          setIsPlaying(!isPlaying);
        }}
      />

      {showQuiz && video.quiz && (
        <QuizModal quiz={video.quiz} onComplete={() => setShowQuiz(false)} />
      )}

      {/* Share Drawer */}
      {showShare && (
        <div className="absolute inset-0 z-[160] bg-black/40" onClick={() => setShowShare(false)}>
          <div className="absolute bottom-0 inset-x-0 bg-zinc-950 rounded-t-[2.5rem] border-t border-white/10 animate-in slide-in-from-bottom duration-300 pb-12 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <span className="w-12 h-1.5 bg-zinc-800 rounded-full absolute top-3 left-1/2 -translate-x-1/2" />
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Share with Friends</h3>
              <button onClick={() => setShowShare(false)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar">
                {shareUsers.map(u => (
                  <button key={u.id} className="flex flex-col items-center gap-2 shrink-0">
                    <div className="w-16 h-16 rounded-full p-1 border-2 border-transparent hover:border-[#00FF9D] transition-all">
                      <img src={u.avatar} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 truncate w-16 text-center">{u.name}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/5">
                {['WhatsApp', 'Instagram', 'SMS', 'Copy Link'].map((label, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white"><Share2 size={20} /></div>
                    <span className="text-[9px] font-black uppercase text-zinc-600 tracking-tighter">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Drawer */}
      {showComments && (
        <div className="absolute inset-0 z-[150] bg-black/40" onClick={() => setShowComments(false)}>
          <div className="absolute bottom-0 inset-x-0 h-[70%] bg-zinc-950 rounded-t-[2.5rem] border-t border-white/10 animate-in slide-in-from-bottom duration-300 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <span className="w-12 h-1.5 bg-zinc-800 rounded-full absolute top-3 left-1/2 -translate-x-1/2" />
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Discussion</h3>
              <button onClick={() => setShowComments(false)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {comments.map(c => (
                <div key={c.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 shrink-0 border border-white/10" />
                  <div className="flex-1">
                    <p className="text-xs font-black text-[#00FF9D]">@{c.user}</p>
                    <p className="text-sm text-zinc-300 font-medium leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-white/5 bg-zinc-900/50 pb-10">
              <div className="relative">
                <input 
                  type="text" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-zinc-800/80 border border-white/5 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#00FF9D] text-black rounded-xl flex items-center justify-center transition-transform active:scale-90"><Send size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 flex flex-col justify-end p-6 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl border-2 border-[#00FF9D] overflow-hidden rotate-3">
            <img src={video.creatorAvatar} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-lg text-white tracking-tight">@{video.creatorName}</h3>
              <button 
                onClick={handleSupport}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tight transition-all duration-300 ${
                  isSupporting ? 'text-[#00FF9D]/70' : 'bg-[#00FF9D] text-black hover:scale-105 active:scale-95'
                }`}
              >
                {!isSupporting && <UserPlus size={10} strokeWidth={4} />}
                {isSupporting ? 'Supporter' : 'Support'}
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-zinc-300 line-clamp-2 mb-3 font-medium leading-tight">{video.description}</p>
        <div className="flex flex-wrap gap-2">
          {video.tags.map(tag => (
            <span key={tag} className="text-[10px] text-zinc-500 font-black uppercase tracking-widest px-2 py-1 bg-white/5 rounded-md">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Sidebar Interaction Buttons */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
        <button onClick={() => { setIsLiked(!isLiked); onAction('LIKE'); }} className={`flex flex-col items-center transition-all active:scale-125 ${isLiked ? 'text-[#FF007A]' : 'text-white'}`}>
          <Heart fill={isLiked ? 'currentColor' : 'none'} size={38} />
          <span className="text-[11px] font-black mt-1 drop-shadow-md">{video.likes + (isLiked ? 1 : 0)}</span>
        </button>

        <button onClick={() => setShowComments(true)} className="flex flex-col items-center text-white active:scale-110 transition-transform">
          <MessageCircle size={38} />
          <span className="text-[11px] font-black mt-1 drop-shadow-md">42</span>
        </button>

        <button onClick={() => { setIsSaved(!isSaved); onAction('SAVE'); }} className={`flex flex-col items-center transition-all active:scale-125 ${isSaved ? 'text-[#00FF9D]' : 'text-white'}`}>
          <Bookmark fill={isSaved ? 'currentColor' : 'none'} size={38} />
          <span className="text-[11px] font-black mt-1 drop-shadow-md">{video.saves + (isSaved ? 1 : 0)}</span>
        </button>

        <button onClick={() => setShowShare(true)} className="flex flex-col items-center text-white active:scale-110 transition-transform">
          <Share2 size={38} />
          <span className="text-[9px] font-black mt-1 uppercase tracking-tighter">Share</span>
        </button>

        <button onClick={() => onAction('TIP')} className="flex flex-col items-center text-white mt-4 active:scale-110 transition-transform">
          <div className="bg-[#FF007A] p-3 rounded-2xl text-white shadow-[0_0_20px_rgba(255,0,122,0.4)]">
            <Coffee size={24} />
          </div>
          <span className="text-[9px] font-black mt-1 uppercase text-[#FF007A]">Gift</span>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
