import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).lean();

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    return res.json(workout);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch workout', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    return res.status(201).json(workout);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create workout', error });
  }
});

export default router;
