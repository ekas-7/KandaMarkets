import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

// Load environment variables first
dotenv.config({ path: '.env.local' });

async function createAdminUser() {
  let client: MongoClient | null = null;

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not set in .env.local');
    }

    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('kanda');
    const adminsCollection = db.collection('admins');

    // Check if admin already exists
    const existingAdmin = await adminsCollection.findOne({ 
      email: 'kandaadmin@ekascodes.com' 
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('isThisIeagal', 12);

    // Create admin user
    const admin = {
      email: 'kandaadmin@ekascodes.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    };

    await adminsCollection.insertOne(admin);
    console.log('✅ Admin user created successfully!');
    console.log('Email: kandaadmin@ekascodes.com');
    console.log('Password: isThisIeagal');
    console.log('Login at: http://localhost:3000/theauthadminkanda');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

createAdminUser();
