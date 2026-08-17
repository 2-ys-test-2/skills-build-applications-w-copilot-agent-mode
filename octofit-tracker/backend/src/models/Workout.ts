import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  durationMinutes: number;
  focus: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 10,
    },
    focus: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
