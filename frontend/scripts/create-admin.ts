import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import clientPromise from '../lib/mongodb';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function createAdminUser() {
  try {
    const client = await clientPromise;
    const db = client.db('kanda');
    const adminsCollection = db.collection('admins');

    // Check if admin already exists
    const existingAdmin = await adminsCollection.findOne({ 
      email: 'kandaadmin@ekascodes.com' 
    });

    if (existingAdmin) {
      console.log('Admin user already exists!');
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

    const result = await adminsCollection.insertOne(admin);
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: kandaadmin@ekascodes.com');
    console.log('Password: isThisIeagal');
    console.log('Admin ID:', result.insertedId);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
