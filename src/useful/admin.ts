// Comma-separated list of Firebase Auth UIDs allowed to create/manage rooms.
// Adding a second admin later is just adding their UID here (and to
// firestore.rules) — no other code changes needed.
const ADMIN_UIDS: string[] = (import.meta.env.VITE_ADMIN_UIDS ?? "")
  .split(",")
  .map((id: string) => id.trim())
  .filter(Boolean);

export const isAdminUid = (uid: string | null): boolean =>
  uid !== null && ADMIN_UIDS.includes(uid);
