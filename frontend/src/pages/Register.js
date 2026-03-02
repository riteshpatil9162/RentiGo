import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('=== Registration Attempt ===');
    console.log('Form Data:', formData);
    console.log('Name:', formData.name, '(length:', formData.name.length, ')');
    console.log('Email:', formData.email);
    console.log('Phone:', formData.phone, '(length:', formData.phone.length, ')');
    console.log('Password:', formData.password.length, 'characters');
    console.log('Role:', formData.role);

    try {
      await register(formData);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration Error:', error);
      
      // More detailed error handling
      if (error.response) {
        // Backend responded with error
        console.error('Backend Error:', error.response.data);
        
        // Check if it's a validation error with errors array
        if (error.response.data?.errors && Array.isArray(error.response.data.errors)) {
          const validationErrors = error.response.data.errors.map(err => err.msg || err.message).join(', ');
          toast.error('Validation Error: ' + validationErrors);
          console.error('Validation Errors:', error.response.data.errors);
        } else {
          const message = error.response.data?.message || error.response.data?.error || 'Registration failed';
          toast.error(message);
        }
      } else if (error.request) {
        // Request made but no response
        toast.error('Cannot connect to server. Please check if backend is running.');
        console.error('No response from server:', error.request);
      } else {
        // Something else happened
        toast.error('Registration failed: ' + error.message);
        console.error('Error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join RentiGo today</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Register As</label>
              <select
                name="role"
                className="form-control form-select"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">Tenant</option>
                <option value="owner">Property Owner</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
