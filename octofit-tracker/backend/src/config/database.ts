import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  }
};

export default connectDB;
