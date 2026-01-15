
# SkillFlash: Retention Push Notifications

## 1. Trigger Types
1.  **Streak Alert (24h Inactive):**
    *   *Copy:* "Your #Coding streak is about to freeze! 🔥 Watch 1 video to save it."
    *   *Trigger:* Cloud Function scheduled every hour checking `users.lastActiveDate`.
2.  **Course Progress:**
    *   *Copy:* "You're only 2 videos away from your #Marketing Badge! 🎓"
3.  **Social Proof:**
    *   *Copy:* "@UserX just passed your level on the leaderboard! 📈"

## 2. Implementation Logic (Cloud Functions)
```javascript
exports.checkStreaks = functions.pubsub.schedule('every 12 hours').onRun(async (context) => {
  const expiredUsers = await db.collection('users')
    .where('lastActiveDate', '<', yesterday)
    .get();
    
  expiredUsers.forEach(user => {
    sendNotification(user.fcmToken, {
      title: "Streak Danger! 🔥",
      body: "Keep your momentum going."
    });
  });
});
```
