require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testRegistration() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Test data
    const testUser = {
      name: 'Debug Test User',
      email: 'debug@test.com',
      password: 'password123',
      phone: '9876543210',
      role: 'user'
    };

    console.log('\nAttempting to create user with data:', {
      name: testUser.name,
      email: testUser.email,
      phone: testUser.phone,
      role: testUser.role
    });

    // Check if user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log('⚠️  User already exists, deleting...');
      await User.deleteOne({ email: testUser.email });
      console.log('✅ Existing user deleted');
    }

    // Create new user
    const user = await User.create(testUser);
    console.log('\n✅ User created successfully!');
    console.log('User ID:', user._id);
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('Role:', user.role);

    // Cleanup
    await User.deleteOne({ email: testUser.email });
    console.log('\n✅ Test user cleaned up');

    console.log('\n✅ Registration test PASSED - Backend is working correctly');
    
  } catch (error) {
    console.error('\n❌ Registration test FAILED');
    console.error('Error:', error.message);
    if (error.errors) {
      console.error('Validation Errors:', error.errors);
    }
  } finally {
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
    process.exit(0);
  }
}

testRegistration();
