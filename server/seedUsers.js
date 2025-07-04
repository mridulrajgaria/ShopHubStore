import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const users = [
  {
    _id: new mongoose.Types.ObjectId('64a1f1e2c1a4b2d3e4f5a6b3'),
    username: 'adminuser',
    email: 'admin@shophub.com',
    password: 'admin@praphull',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId('64a1f1e2c1a4b2d3e4f5a6b2'),
    username: 'editoruser',
    email: 'editor@shophub.com',
    password: 'editor@praphull',
    firstName: 'Editor',
    lastName: 'User',
    role: 'editor',
    isActive: true
  },
  {
    _id: new mongoose.Types.ObjectId('64a1f1e2c1a4b2d3e4f5a6b1'),
    username: 'regularuser',
    email: 'user@shophub.com',
    password: 'user@praphull',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    isActive: true
  }
];

async function seedUsers() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, 12);
    const { _id, ...userData } = user;
    userData.password = hashed;
    await User.updateOne(
      { email: user.email },
      {
        $set: userData,
        $setOnInsert: { _id }
      },
      { upsert: true }
    );
  }

  console.log('Demo users seeded!');
  await mongoose.disconnect();
}

seedUsers().catch(console.error);
