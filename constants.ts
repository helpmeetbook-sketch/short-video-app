
import { Category, Video } from './types';

export const XP_PER_WATCH = 15;
export const XP_PER_LIKE = 5;
export const XP_QUIZ_BONUS = 30;
export const XP_TO_LEVEL_UP = 100;

export const CATEGORIES = [
  Category.TECH,
  Category.ART,
  Category.LIFE_HACKS,
  Category.BUSINESS
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'v1',
    creatorId: 'c1',
    creatorName: 'CodeWithSarah',
    creatorAvatar: 'https://picsum.photos/seed/sarah/100/100',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://picsum.photos/seed/code/400/800',
    description: 'Learn React Hooks in 60 seconds! 🚀 #coding #react',
    tags: ['coding', 'react', 'javascript'],
    category: Category.TECH,
    likes: 1240,
    saves: 450,
    quickTip: 'Use useMemo only when you have expensive calculations!',
    quiz: {
      question: "Which hook is used for side effects in React?",
      options: ["useState", "useEffect", "useMemo", "useContext"],
      correctIndex: 1
    }
  },
  {
    id: 'v2',
    creatorId: 'c2',
    creatorName: 'ArtByAlex',
    creatorAvatar: 'https://picsum.photos/seed/alex/100/100',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://picsum.photos/seed/art/400/800',
    description: 'Color theory for digital illustrators. 🎨 #art #design',
    tags: ['art', 'design', 'illustration'],
    category: Category.ART,
    likes: 890,
    saves: 120,
    quickTip: 'Complementary colors make your subject pop!',
    quiz: {
      question: "What are colors opposite each other on the color wheel called?",
      options: ["Analogous", "Monochromatic", "Complementary", "Triadic"],
      correctIndex: 2
    }
  },
  {
    id: 'v3',
    creatorId: 'c3',
    creatorName: 'BusinessBen',
    creatorAvatar: 'https://picsum.photos/seed/ben/100/100',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://picsum.photos/seed/biz/400/800',
    description: '3 Steps to start your side hustle. 💸 #business #hustle',
    tags: ['business', 'hustle', 'startup'],
    category: Category.BUSINESS,
    likes: 2100,
    saves: 980,
    quickTip: 'Validate your idea before building the MVP.',
    quiz: {
      question: "What does MVP stand for in business?",
      options: ["Most Valuable Person", "Minimum Viable Product", "Maximum Value Profit", "Most Viewed Post"],
      correctIndex: 1
    }
  }
];

export const MOCK_LEADERBOARD = [
  { id: 'u1', username: 'LearnerOne', avatar: 'https://picsum.photos/seed/learner/100/100', xp: 450 },
  { id: 'u2', username: 'KnowledgeSeeker', avatar: 'https://picsum.photos/seed/p2/100/100', xp: 820 },
  { id: 'u3', username: 'EduGenZ', avatar: 'https://picsum.photos/seed/p3/100/100', xp: 610 },
  { id: 'u4', username: 'SkillMaster', avatar: 'https://picsum.photos/seed/p4/100/100', xp: 940 },
  { id: 'u5', username: 'FutureDev', avatar: 'https://picsum.photos/seed/p5/100/100', xp: 320 },
];
