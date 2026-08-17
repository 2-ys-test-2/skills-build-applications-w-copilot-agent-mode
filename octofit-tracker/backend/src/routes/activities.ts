import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId').lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId').lean();

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    return res.json(activity);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch activity', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    return res.status(201).json(activity);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create activity', error });
  }
});

export default router;
