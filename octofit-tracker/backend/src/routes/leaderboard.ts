import { Router, Request, Response } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).populate('userId').lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

router.get('/:rank', async (req: Request, res: Response) => {
  try {
    const entry = await LeaderboardEntry.findOne({ rank: Number(req.params.rank) }).populate('userId').lean();

    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }

    return res.json(entry);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch leaderboard entry', error });
  }
});

export default router;
