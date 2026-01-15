
# SkillFlash: Next-Gen AR Learning Overlays

## 1. Core Stack
*   **Package:** `arcore_flutter_plugin` (Android) / `arkit_flutter_plugin` (iOS).
*   **Alternative:** `arkit_plugin` for cross-platform unified API.

## 2. Creator Implementation
Creators can "tag" 3D space during the video recording process.
```dart
// Conceptual Creator Code
ARKitSceneView(
  onARKitViewCreated: (view) {
    // Allows creator to place 3D "Learning Pointers"
    final node = ARKitNode(
      geometry: ARKitSphere(radius: 0.1),
      position: Vector3(0, 0, -0.5),
    );
    view.add(node);
  },
);
```

## 3. Engagement Logic
*   **3D Labels:** Floating text boxes explaining complex parts of a machine or code block.
*   **Gamified Discovery:** Users must "tap" the AR floating object to earn bonus XP.
