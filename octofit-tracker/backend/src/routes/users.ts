import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate('teamId').lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate('teamId').lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch user', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create user', error });
  }
});

export default router;
