import { kv } from '@vercel/kv';

const DEADLINE = new Date('2026-05-17T22:40:00Z');

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const picks = await kv.hgetall('picks') || {};
  const closed = Date.now() >= DEADLINE.getTime();
  res.json({ picks, closed });
}
