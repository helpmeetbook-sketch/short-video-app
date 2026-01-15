
import React, { useState, useEffect, useRef } from 'react';
import { Video, User } from '../types';
import { Heart, Bookmark, Coffee, MessageCircle, X, Send, Share2, UserPlus } from 'lucide-react';
import QuizModal from './QuizModal';

interface VideoPlayerProps {
  video: Video;
  user: User;
  onAction: (type: 'LIKE' | 'SAVE' | 'WATCH' | 'TIP' | 'QUIZ_CORRECT' | 'SUPPORT' | 'SHARE', creatorName?: string) => void;
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
                onClick={(e) => { e.stopPropagation(); setIsSupporting(true); onAction('SUPPORT'); }}
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
        <button onClick={() => onAction('TIP', video.creatorName)} className="flex flex-col items-center text-white mt-4 active:scale-110 transition-transform">
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
