# 🔢 Flow 33: App Versioning & Update Notices

## 🧠 Goal

Track version history and inform users of changes made between versions, especially when major features, bug fixes, or migration tasks are involved.

---

## 🔄 Flow Breakdown

### 1. Version Identifier

| Field       | Example            | Notes                 |
| ----------- | ------------------ | --------------------- |
| App Version | `v1.0.0`, `v3.3.0` | Semantic versioning   |
| Build Date  | `2025-06-13`       | Optional, for display |

- Stored locally in DB or config file
- Compared on app launch to check for changes

---

### 2. Display Changelog (on version change)

- On first launch after update:
  - Modal or inline banner with changelog
  - Option: “Don’t show again” checkbox
- Store last seen version in user preferences

---

### 3. Update Workflow (Future Cloud Support)

| Type                    | Behavior                                |
| ----------------------- | --------------------------------------- |
| 🔧 Manual Update        | Download/install new version manually   |
| ☁️ Auto-update (future) | Electron auto-update or web-deployed CI |

---

### 4. Developer-facing Uses

- Use version ID to:
  - Migrate data schemas between versions
  - Log bugs tied to specific app builds
  - Enable feature toggles conditionally by version

---

## ✅ Output Summary

| Component                     | Behavior                          |
| ----------------------------- | --------------------------------- |
| **Reads From**                | `appMetadata`, `userPreferences`  |
| **Writes To**                 | ✅ On version change              |
| **UI Re-render Required?**    | ✅ For changelog                  |
| **User Confirmation Needed?** | ❌                                |
| **Recoverable?**              | ✅ Can re-show changelog manually |

---

## 🔮 Future Enhancements

- Sync changelogs from GitHub releases
- “What’s New” tab in Settings
- Support rolling back localStorage or DB states by version (snapshots)
