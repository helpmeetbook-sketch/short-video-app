
# SkillFlash: AI Subtitle Generation System Design

## 1. The Pipeline
1.  **Video Upload:** User uploads video to Firebase Storage.
2.  **Trigger:** Firebase Function `onFinalize` triggers.
3.  **Audio Extraction:** Use `ffmpeg` (in a Google Cloud Run container) to extract `.wav` from `.mp4`.
4.  **Speech-to-Text (STT):**
    *   Send audio to **Google Cloud Speech-to-Text API**.
    *   Enable `enableSpeakerDiarization` and `enableWordTimeOffsets`.
    *   Request `alternativeLanguageCodes` (e.g., ['bn-BD', 'en-US']) for bilingual support.
5.  **Transcription Storage:** Store result in Firestore as an array of timestamped objects:
    `{ start: 0.5, end: 1.2, text: "Welcome to React" }`.

## 2. Frontend Rendering (Flutter/Web)
*   The video player listens to the current `playbackPosition`.
*   A reactive `Provider` (Riverpod) filters the transcription array for the current timestamp.
*   The UI displays the text in a styled `Text` widget with a semi-transparent background.

## 3. Multi-Language (Bangla/English)
*   Use the `v2` STT API for "Language Identification" to detect if the creator is speaking Bangla, English, or both.
*   Generated subtitles are automatically stored in the primary detected language.
