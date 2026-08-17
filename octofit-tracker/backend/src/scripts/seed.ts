import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Alpha Velocity',
        description: 'Cardio-focused endurance crew',
        members: 8,
        wins: 12,
      },
      {
        name: 'Summit Strength',
        description: 'Power and stability specialists',
        members: 7,
        wins: 9,
      },
      {
        name: 'Core Collective',
        description: 'Mobility and recovery champions',
        members: 9,
        wins: 14,
      },
    ]);

    const users = await User.insertMany([
      {
        name: 'Ada Johnson',
        email: 'ada.johnson@example.com',
        teamId: teams[0]._id,
        fitnessLevel: 'Advanced',
        goals: ['Run 10k', 'Improve recovery'],
      },
      {
        name: 'Lin Chen',
        email: 'lin.chen@example.com',
        teamId: teams[1]._id,
        fitnessLevel: 'Intermediate',
        goals: ['Increase strength', 'Track calories'],
      },
      {
        name: 'Mateo Silva',
        email: 'mateo.silva@example.com',
        teamId: teams[2]._id,
        fitnessLevel: 'Beginner',
        goals: ['Build endurance', 'Stay consistent'],
      },
      {
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        teamId: teams[0]._id,
        fitnessLevel: 'Intermediate',
        goals: ['Mobility work', 'Strength gains'],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 45,
        caloriesBurned: 430,
        date: new Date('2026-08-10T06:30:00.000Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength Training',
        durationMinutes: 52,
        caloriesBurned: 510,
        date: new Date('2026-08-12T18:15:00.000Z'),
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 38,
        caloriesBurned: 290,
        date: new Date('2026-08-09T07:00:00.000Z'),
      },
      {
        userId: users[3]._id,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        date: new Date('2026-08-11T19:15:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        name: 'Ada Johnson',
        points: 980,
        rank: 1,
      },
      {
        userId: users[1]._id,
        name: 'Lin Chen',
        points: 940,
        rank: 2,
      },
      {
        userId: users[2]._id,
        name: 'Mateo Silva',
        points: 905,
        rank: 3,
      },
      {
        userId: users[3]._id,
        name: 'Priya Patel',
        points: 870,
        rank: 4,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Blast',
        difficulty: 'Advanced',
        durationMinutes: 25,
        focus: ['cardio', 'intervals', 'full-body'],
      },
      {
        name: 'Core Circuit',
        difficulty: 'Intermediate',
        durationMinutes: 20,
        focus: ['abs', 'balance', 'posture'],
      },
      {
        name: 'Recovery Walk',
        difficulty: 'Beginner',
        durationMinutes: 30,
        focus: ['mobility', 'recovery', 'walking'],
      },
      {
        name: 'Power Lift',
        difficulty: 'Advanced',
        durationMinutes: 40,
        focus: ['squats', 'deadlifts', 'strength'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
