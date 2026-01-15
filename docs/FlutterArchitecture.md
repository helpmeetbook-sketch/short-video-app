
# SkillFlash: Mobile Technical Roadmap (Flutter)

## 1. Clean Architecture (Folder Structure)
Recommended structure for scalability and maintainability.

```text
lib/
├── main.dart
├── core/
│   ├── theme/          # AppTheme, Colors, Typography
│   ├── errors/         # Custom Exceptions
│   ├── network/        # API Client, Firebase helpers
│   └── constants/      # App-wide constants
├── features/
│   ├── auth/
│   │   ├── data/       # Repositories, DataSources
│   │   ├── domain/     # Entities, Use Cases
│   │   └── presentation/ # UI, Blocs/Riverpod Providers
│   ├── feed/
│   │   ├── widgets/    # TikTokScroll, VideoPlayer
│   │   └── presentation/
│   ├── profile/
│   └── creator_studio/
├── services/           # Analytics, Notification, GamificationEngine
└── shared/             # Common widgets (Buttons, Loaders)
```

## 2. Essential Packages (`pubspec.yaml`)
- **State Management:** `flutter_riverpod` or `flutter_bloc`
- **Video Player:** `video_player` + `chewie` (or `tiktok_video_player` for optimization)
- **Backend:** `firebase_core`, `cloud_firestore`, `firebase_auth`, `firebase_storage`
- **Animations:** `framer_motion_flutter` or `lottie`
- **Networking:** `dio`
- **Icons:** `font_awesome_flutter` or `lucide_icons`

## 3. Implementation Logic
- **Vertical Scroll:** Use `PageView.builder` with `scrollDirection: Axis.vertical`.
- **XP Engine:** Trigger a background callback when `VideoPlayerController.position` reaches 95% of total duration.
- **Monetization:** Use `stripe_sdk` or `in_app_purchase` for tipping and course access.
