import { pool } from './database.js';

const drop = `
  DROP TABLE IF EXISTS rackets;
`;

const create = `
  CREATE TABLE rackets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    headsize TEXT NOT NULL,        -- '95','98','100','104'
    framecolor TEXT NOT NULL,      -- 'black','red','blue','white'
    grip TEXT NOT NULL,            -- '4 1/8','4 1/4','4 3/8','4 1/2'
    stringpattern TEXT NOT NULL,   -- '16x19','18x20','16x18'
    extended BOOLEAN NOT NULL DEFAULT false,  -- 27.5"
    custompaint BOOLEAN NOT NULL DEFAULT false,
    price INTEGER NOT NULL,
    image TEXT,                    -- optional hero image url
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
`;

const seed = `
  INSERT INTO rackets
    (name, headsize, framecolor, grip, stringpattern, extended, custompaint, price, image)
  VALUES
    ('Baseline Burner', '100', 'black', '4 3/8', '16x19', false, false, 199, NULL),
    ('Spin Maestro', '98', 'red', '4 1/4', '16x18', false, true, 249, NULL);
`;

async function main() {
  try {
    console.log('Resetting database...');
    await pool.query(drop);
    await pool.query(create);
    await pool.query(seed);
    console.log('Done.');
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
main();
