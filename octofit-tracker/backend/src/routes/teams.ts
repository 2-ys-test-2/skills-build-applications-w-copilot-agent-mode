import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).lean();

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    return res.json(team);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch team', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const team = await Team.create(req.body);
    return res.status(201).json(team);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create team', error });
  }
});

export default router;
