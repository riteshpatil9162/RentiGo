import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserTag } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  
  // Profile update state
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    avatar: '',
  });
  
  // Password update state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);

    try {
      console.log('Updating profile with:', profileData);
      const response = await api.put('/auth/update-profile', profileData);
      
      if (response.data.success) {
        updateUser(response.data.user);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Profile Update Error:', error);
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setLoadingPassword(true);

    try {
      console.log('Updating password...');
      const response = await api.put('/auth/update-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.data.success) {
        toast.success('Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.error('Password Update Error:', error);
      const message = error.response?.data?.message || 'Failed to update password';
      toast.error(message);
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        <div className="profile-content">
          {/* User Info Card */}
          <div className="profile-info-card">
            <div className="profile-avatar">
              <img 
                src={user?.avatar || 'https://via.placeholder.com/150'} 
                alt={user?.name}
              />
            </div>
            <h2>{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-role">
              <FaUserTag />
              <span>{user?.role === 'owner' ? 'Property Owner' : user?.role === 'admin' ? 'Administrator' : 'Tenant'}</span>
            </div>
          </div>

          {/* Update Profile Form */}
          <div className="profile-form-card">
            <h3>
              <FaUser /> Update Profile Information
            </h3>
            <form onSubmit={handleProfileSubmit} className="profile-form">
              <div className="form-group">
                <label className="form-label">
                  <FaUser /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaEnvelope /> Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={user?.email}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
                <small className="form-text">Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaPhone /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaUser /> Avatar URL (Optional)
                </label>
                <input
                  type="url"
                  name="avatar"
                  className="form-control"
                  placeholder="https://example.com/avatar.jpg"
                  value={profileData.avatar}
                  onChange={handleProfileChange}
                />
                <small className="form-text">Enter a URL for your profile picture</small>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block" 
                disabled={loadingProfile}
              >
                {loadingProfile ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="profile-form-card">
            <h3>
              <FaLock /> Change Password
            </h3>
            <form onSubmit={handlePasswordSubmit} className="profile-form">
              <div className="form-group">
                <label className="form-label">
                  <FaLock /> Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-control"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaLock /> New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  placeholder="Enter new password (min 6 characters)"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaLock /> Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block" 
                disabled={loadingPassword}
              >
                {loadingPassword ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
