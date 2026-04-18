const KEYS = {
  user: "credly_user",
  theme: "credly_theme",
  creatorLists: "credly_creator_lists",
  notifications: "credly_notifications",
  proposals: "credly_proposals",
  briefs: "credly_campaign_briefs",
};

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCurrentUser() {
  return readJson(KEYS.user, null);
}

export function setCurrentUser(user) {
  writeJson(KEYS.user, user);
}

export function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEYS.user);
}

export function getThemePreference() {
  return readJson(KEYS.theme, "light");
}

export function setThemePreference(theme) {
  writeJson(KEYS.theme, theme);
}

export function getCreatorLists() {
  return readJson(KEYS.creatorLists, []);
}

export function saveCreatorLists(lists) {
  writeJson(KEYS.creatorLists, lists);
}

export function addCreatorToList(listName, creatorId) {
  const existing = getCreatorLists();
  const now = new Date().toISOString();
  const nextLists = existing.map((list) => {
    if (list.name !== listName) return list;
    if (list.creatorIds.includes(creatorId)) return list;
    return { ...list, creatorIds: [...list.creatorIds, creatorId], updatedAt: now };
  });
  saveCreatorLists(nextLists);
  return nextLists;
}

export function createList(name) {
  const trimmed = name.trim();
  if (!trimmed) return getCreatorLists();
  const existing = getCreatorLists();
  if (existing.find((list) => list.name.toLowerCase() === trimmed.toLowerCase())) {
    return existing;
  }
  const now = new Date().toISOString();
  const next = [...existing, { name: trimmed, creatorIds: [], createdAt: now, updatedAt: now }];
  saveCreatorLists(next);
  return next;
}

const defaultNotifications = [
  {
    id: "n1",
    title: "High-fit creator available",
    description: "Meera Iyer now matches your fitness campaign at 91% fit.",
    read: false,
    timestamp: "2h ago",
  },
  {
    id: "n2",
    title: "Proposal viewed",
    description: "Priya Sharma viewed your proposal for Summer Glow Launch.",
    read: false,
    timestamp: "5h ago",
  },
  {
    id: "n3",
    title: "Campaign deadline reminder",
    description: "Brand Ambassador Q3 has 8 days remaining.",
    read: true,
    timestamp: "1d ago",
  },
];

export function getNotifications() {
  const current = readJson(KEYS.notifications, null);
  if (current) return current;
  writeJson(KEYS.notifications, defaultNotifications);
  return defaultNotifications;
}

export function markAllNotificationsRead() {
  const next = getNotifications().map((item) => ({ ...item, read: true }));
  writeJson(KEYS.notifications, next);
  return next;
}

export function getProposals() {
  return readJson(KEYS.proposals, []);
}

export function saveProposal(proposal) {
  const existing = getProposals();
  const next = [{ ...proposal, id: `p${Date.now()}` }, ...existing];
  writeJson(KEYS.proposals, next);
  return next;
}

export function updateProposalStatus(id, status) {
  const next = getProposals().map((p) => (p.id === id ? { ...p, status } : p));
  writeJson(KEYS.proposals, next);
  return next;
}

export function getBriefs() {
  return readJson(KEYS.briefs, []);
}

export function saveBrief(brief) {
  const existing = getBriefs();
  const next = [{ ...brief, id: `b${Date.now()}`, createdAt: new Date().toISOString() }, ...existing];
  writeJson(KEYS.briefs, next);
  return next;
}

