
import { User } from '../types';

export const STREAK_FREEZE_COST = 500; // XP

export const processStreak = (user: User): User => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const lastDate = user.lastActiveDate;

  if (lastDate === today) return user;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak = user.streakCount;
  let newFreezes = user.streakFreezes;

  if (lastDate === yesterdayStr) {
    newStreak += 1;
  } else if (lastDate !== "") {
    // Gap in activity
    if (newFreezes > 0) {
      newFreezes -= 1;
      // Streak saved by freeze
    } else {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  return {
    ...user,
    streakCount: newStreak,
    lastActiveDate: today,
    streakFreezes: newFreezes
  };
};

export const buyStreakFreeze = (user: User): User => {
  if (user.xp < STREAK_FREEZE_COST) return user;
  return {
    ...user,
    xp: user.xp - STREAK_FREEZE_COST,
    streakFreezes: user.streakFreezes + 1
  };
};
