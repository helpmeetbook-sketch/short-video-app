
# Firestore Schema (SkillFlash)

### Collection: `users`
- `id`: string (uid)
- `username`: string
- `email`: string
- `avatar_url`: string
- `xp`: number
- `level`: number
- `is_creator`: boolean
- `fcm_token`: string (for notifications)

### Collection: `videos`
- `id`: string
- `creator_id`: string (reference to users/id)
- `video_url`: string
- `thumbnail_url`: string
- `caption`: string
- `category`: string (Tech, Art, etc.)
- `tags`: array[string]
- `stats`: { likes: int, views: int, saves: int }
- `quick_tip`: string (AI generated)

### Collection: `courses` (Pro)
- `id`: string
- `creator_id`: string
- `title`: string
- `description`: string
- `price`: number (cents)
- `video_lessons`: array[{ title: string, url: string }]

### Collection: `transactions`
- `id`: string
- `from_id`: string
- `to_id`: string
- `type`: string ('TIP', 'COURSE')
- `amount`: number
- `timestamp`: timestamp
