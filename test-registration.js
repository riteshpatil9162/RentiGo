// Quick test - paste this in the browser console on the registration page

const testFormData = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  phone: '9876543210',
  role: 'user'
};

console.log('Testing with:', testFormData);

fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testFormData)
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  alert('Registration successful! Backend is working.');
})
.catch(error => {
  console.error('Error:', error);
  alert('Error: ' + error.message);
});
