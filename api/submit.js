import { kv } from '@vercel/kv';

const DEADLINE = new Date('2026-05-17T22:40:00Z');

const VALID_SLUGS = new Set([
  'taj-mahal', 'ocelli', 'crupper', 'robusta', 'talkin', 'chip-honcho',
  'the-hell-we-did', 'bull-by-the-horns', 'iron-honor', 'napoleon-solo',
  'corona-de-oro', 'incredibolt', 'great-white', 'pretty-boy-miah'
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  if (Date.now() >= DEADLINE.getTime()) {
    return res.status(403).json({ ok: false, error: 'Picks are closed' });
  }

  const { name, horse } = req.body;
  if (!name || !horse) return res.status(400).json({ ok: false, error: 'Missing name or horse' });
  if (!VALID_SLUGS.has(horse)) return res.status(400).json({ ok: false, error: 'Invalid horse' });

  const trimmedName = name.trim().substring(0, 30);
  if (!trimmedName) return res.status(400).json({ ok: false, error: 'Name cannot be empty' });

  const existing = await kv.hget('picks', trimmedName);
  if (existing) {
    return res.status(409).json({ ok: false, error: 'This name has already submitted a pick' });
  }

  await kv.hset('picks', { [trimmedName]: horse });
  res.json({ ok: true });
}
