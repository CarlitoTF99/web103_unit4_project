export async function getAllRackets() {
  const r = await fetch('/api/rackets');
  let payload;
  try { payload = await r.json(); } catch { payload = null; }
  if (!r.ok || !Array.isArray(payload)) {
    console.error('GET /api/rackets failed:', r.status, payload);
    return []; // <-- so Home.jsx can render safely
  }
  return payload;
}
