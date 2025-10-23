import { pool } from '../config/database.js';

// allowed sets & simple compatibility rules for validation:
const ALLOWED = {
  headsize: ['95','98','100','104'],
  framecolor: ['black','red','blue','white'],
  grip: ['4 1/8','4 1/4','4 3/8','4 1/2'],
  stringpattern: ['16x19','18x20','16x18']
};

// Impossible combos:
// - '95' headsize cannot be extended (too head-light frame for 27.5")
// - '104' headsize must use '16x19' or '16x18' (no dense '18x20')
// - custompaint + white framecolor is disallowed due to topcoat issue (example rule)
function violatesRules(body) {
  const { headsize, stringpattern, extended, framecolor, custompaint } = body;
  if (headsize === '95' && extended) return '95 headsize cannot be extended length.';
  if (headsize === '104' && stringpattern === '18x20')
    return '104 headsize is incompatible with 18x20 string pattern.';
  if (custompaint && framecolor === 'white')
    return 'Custom paint is unavailable for white frames.';
  return null;
}

function validateFields(body) {
  const keys = ['name','headsize','framecolor','grip','stringpattern','extended','custompaint'];
  for (const k of keys) {
    if (body[k] === undefined || body[k] === null || body[k] === '') {
      return `Missing required field: ${k}`;
    }
  }
  if (!ALLOWED.headsize.includes(body.headsize)) return 'Invalid headsize';
  if (!ALLOWED.framecolor.includes(body.framecolor)) return 'Invalid framecolor';
  if (!ALLOWED.grip.includes(body.grip)) return 'Invalid grip';
  if (!ALLOWED.stringpattern.includes(body.stringpattern)) return 'Invalid stringpattern';
  return violatesRules(body);
}

export const getRackets = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rackets ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getRacket = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query('SELECT * FROM rackets WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const createRacket = async (req, res) => {
  try {
    const err = validateFields(req.body);
    if (err) return res.status(400).json({ error: err });

    const { name, headsize, framecolor, grip, stringpattern, extended, custompaint, image } = req.body;

    // simple server-side price calc (mirrors client util):
    const base = headsize === '95' ? 229 : headsize === '98' ? 219 : headsize === '100' ? 199 : 189;
    const extras = (extended ? 30 : 0) + (custompaint ? 50 : 0) + (stringpattern === '18x20' ? 10 : 0);
    const price = base + extras;

    const q = `
      INSERT INTO rackets (name, headsize, framecolor, grip, stringpattern, extended, custompaint, price, image)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;
    const vals = [name, headsize, framecolor, grip, stringpattern, extended, custompaint, price, image || null];
    const result = await pool.query(q, vals);
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};

export const updateRacket = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const err = validateFields(req.body);
    if (err) return res.status(400).json({ error: err });

    const { name, headsize, framecolor, grip, stringpattern, extended, custompaint, image } = req.body;

    const base = headsize === '95' ? 229 : headsize === '98' ? 219 : headsize === '100' ? 199 : 189;
    const extras = (extended ? 30 : 0) + (custompaint ? 50 : 0) + (stringpattern === '18x20' ? 10 : 0);
    const price = base + extras;

    const q = `
      UPDATE rackets
      SET name=$1, headsize=$2, framecolor=$3, grip=$4, stringpattern=$5, extended=$6, custompaint=$7, price=$8, image=$9
      WHERE id=$10
      RETURNING *;
    `;
    const vals = [name, headsize, framecolor, grip, stringpattern, extended, custompaint, price, image || null, id];
    const result = await pool.query(q, vals);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(result.rows[0]);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};

export const deleteRacket = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query('DELETE FROM rackets WHERE id=$1 RETURNING *;', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(result.rows[0]);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};
