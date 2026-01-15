
# SkillFlash: Smart Recommendation Engine Design

## 1. Engagement-Based Weighting (Real-time)
The algorithm tracks "Interest Affinity" scores in a user's Firestore profile.

| Action | Score Weight |
| :--- | :--- |
| Full Watch (100%) | +10 per tag |
| Partial Watch (>50%) | +5 per tag |
| Like | +15 per tag |
| Save to Notebook | +25 per tag |
| Correct Quiz Answer | +50 per tag |

## 2. Firestore Query Structure
To optimize for the "For You" page, we use a hybrid filtering strategy.

### Query 1: Interest-Aligned Content
Find videos matching the user's top categories.
```javascript
// Firestore Query
const topCategory = user.topInterest; // e.g., 'Tech'
const fypQuery = db.collection('videos')
  .where('category', '==', topCategory)
  .where('is_approved', '==', true)
  .orderBy('engagement_score', 'desc')
  .limit(10);
```

### Query 2: Viral Diversity
Inject viral content from other categories to prevent "echo chambers."
```javascript
const globalQuery = db.collection('videos')
  .where('engagement_score', '>', 1000)
  .orderBy('created_at', 'desc')
  .limit(5);
```

## 3. Cold Start Strategy
For new users, we present a mandatory "Pick 3 Skills" onboarding screen which initializes their starting `interestWeights`.
