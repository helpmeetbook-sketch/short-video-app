
export enum Category {
  TECH = 'Tech',
  ART = 'Art',
  LIFE_HACKS = 'Life Hacks',
  BUSINESS = 'Business'
}

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface UserNote {
  videoId: string;
  videoTitle: string;
  timestamp: number;
  note: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  isCreator: boolean;
  following: string[];
  interestWeights: Record<string, number>;
  watchedVideoIds: string[];
  notes: UserNote[];
  streakCount: number;
  lastActiveDate: string; // ISO string
  streakFreezes: number;
}

export interface Video {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  url: string;
  thumbnail: string;
  description: string;
  tags: string[];
  category: Category;
  likes: number;
  saves: number;
  quickTip?: string;
  quiz?: Quiz;
  summary?: string[]; // AI-generated bullet points
}

export interface CreatorStats {
  totalViews: number;
  xpGenerated: number;
  walletBalance: number;
}

export interface CategoryProgress {
  category: Category;
  completedVideos: number;
  totalVideos: number;
}
