// pages/api/session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession as getServerSession } from '@/lib/getSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession();
    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get session' });
  }
}
