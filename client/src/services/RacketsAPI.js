// client/src/services/RacketsAPI.js
const API = "/api";

// ---------- READ ----------
export async function getAllRackets() {
  const r = await fetch(`${API}/rackets`);
  let data = [];
  try { data = await r.json(); } catch {}
  return Array.isArray(data) ? data : [];
}

export async function getRacket(id) {
  const r = await fetch(`${API}/rackets/${id}`);
  return r.json();
}

// ---------- CREATE ----------
export async function createRacket(payload) {
  const r = await fetch(`${API}/rackets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}

// ---------- UPDATE ----------
export async function updateRacket(id, payload) {
  const r = await fetch(`${API}/rackets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}

// ---------- DELETE ----------
export async function deleteRacket(id) {
  const r = await fetch(`${API}/rackets/${id}`, { method: "DELETE" });
  return r.json();
}

// ---------- OPTIONS (exported!) ----------
export const OPTIONS = {
  headsize: ["95", "98", "100", "104"],
  framecolor: ["black", "red", "blue", "white"],
  grip: ["4 1/8", "4 1/4", "4 3/8", "4 1/2"],
  stringpattern: ["16x19", "18x20", "16x18"],
};
