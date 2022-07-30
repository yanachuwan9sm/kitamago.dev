import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../utils/microCMS/client';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query.q !== 'string') {
    res.status(404).end();
    return;
  }

  const data = await client.get({
    endpoint: 'blog',
    queries: { q: req.query.q },
  });

  res.status(200).json({ ...data });
};

export default search;
