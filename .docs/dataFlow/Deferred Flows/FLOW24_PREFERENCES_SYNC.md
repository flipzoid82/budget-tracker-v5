# ☁️ Flow 24: User Preferences Sync (Future Cloud Features)

## 🧠 Goal

Lay the groundwork for future support of cloud-synced preferences, so users can maintain consistent settings across devices and installs.

---

## 🔄 Flow Breakdown

### 1. Preference Categories to Sync

| Preference | Notes |
|------------|-------|
| 🌗 Dark Mode | Theme setting (light/dark) |
| 📊 Default Dashboard View | Expanded/condensed or widget order |
| 📆 Default Month Behavior | Auto-load most recent or custom month |
| 💬 Notifications | Alert toggle settings |
| 💾 Auto Backup | Frequency or disable flag |
| 💻 Last Viewed Page | (Optional) Resume app on last visited tab |

---

### 2. Storage Format

```json
{
  "userId": "abc123",
  "preferences": {
    "darkMode": true,
    "defaultView": "expanded",
    "loadLatestMonth": true,
    "alertsEnabled": true,
    "backupFrequency": "weekly"
  }
}
```

---

### 3. Sync Strategy (Phase 2+)

- Upload to secure cloud DB on preference change
- Download preferences on login
- Fallback to local defaults if offline
- Encrypt preferences at rest and in transit

---

### 4. UI Placement

- ⚙️ Settings > Preferences > "Sync Across Devices" toggle
- Login required to enable sync
- Show sync status indicator (last synced, errors)

---

## 🔥 Edge Cases

| Case | Behavior |
|------|----------|
| Sync conflict | Use “last updated wins” or manual merge |
| Offline usage | Use local preferences and queue updates |
| Corrupted cloud data | Fallback to local backup |

---

## ✅ Output Summary

| Component | Behavior |
|----------|----------|
| **Reads From** | `settings`, `userId` |
| **Writes To** | ✅ On change |
| **UI Re-render Required?** | ✅ For theme, layout |
| **User Confirmation Needed?** | ❌ |
| **Recoverable?** | ✅ via cloud backup and export |

---

## 🔮 Future Enhancements

- Multi-device sync with real-time update
- Theme editor for custom presets
- Cross-user preference export/import