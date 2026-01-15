
import { XP_TO_LEVEL_UP } from '../constants';

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / XP_TO_LEVEL_UP) + 1;
};

export const getProgressToNextLevel = (xp: number): number => {
  const currentLevelXp = xp % XP_TO_LEVEL_UP;
  return (currentLevelXp / XP_TO_LEVEL_UP) * 100;
};

export const getLevelTitle = (level: number): string => {
  if (level < 5) return 'Novice';
  if (level < 10) return 'Scholar';
  if (level < 20) return 'Expert';
  return 'Sage';
};
