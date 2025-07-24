
# 🕒 Deferred Flows – Phase 4 and Beyond

These flows have been reviewed and explicitly deferred from Phase 3 implementation. They are flagged for future consideration in Phase 4 or during deployment stabilization.

---

## 🚫 Deferred from Current Phase

| Flow File                     | Reason |
|------------------------------|--------|
| `FLOW16_AUTH_SIGNIN.md`      | Requires user table, authentication schema, and secure IPC credential handling |
| `FLOW24_PREFERENCES_SYNC.md` | Involves cloud sync and multi-device strategies, not aligned with offline-first scope |
| `FLOW25_RECURRING_TRANSACTIONS.md` | Needs new schema (`recurring` table) and generator logic |
| `FLOW26_MULTI_USER_SUPPORT.md` | Depends on authentication and user-scoped DB separation |
| `FLOW27_VERSIONING_UPDATES.md` | Requires metadata tracking, changelog display, and CI/CD or update handling |

---

## 🗑️ Archived Due to Redundancy

| Flow File              | Reason |
|------------------------|--------|
| `FLOW11_IMPORT_JSON.md` | Merged into `FLOW1_IMPORT_JSON.md` and replaced |

---

## 📘 Notes

These flows are archived but not removed. When the core feature set is stable and app deployment is near, they can be revisited with updated schema and UI hooks.

