import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaUser, FaHeart, FaClipboardList, FaSignOutAlt, FaBars, FaTimes, FaPlus, FaChevronDown } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-logo">RentiGo</span>
          </Link>

          <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/properties" className="nav-link" onClick={() => setIsOpen(false)}>
              Properties
            </Link>
            
            {isAuthenticated ? (
              <>
                {(user?.role === 'owner' || user?.role === 'admin') && (
                  <Link to="/add-property" className="nav-link" onClick={() => setIsOpen(false)}>
                    <FaPlus /> List Property
                  </Link>
                )}
                
                <div className="user-dropdown">
                  <button className="user-btn" onClick={toggleDropdown}>
                    <FaUser />
                    <span>{user?.name}</span>
                    <FaChevronDown className={`chevron-icon ${showDropdown ? 'rotate' : ''}`} />
                  </button>
                  
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <Link to="/dashboard" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        <FaUser /> Dashboard
                      </Link>
                      <Link to="/my-bookings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        <FaClipboardList /> My Bookings
                      </Link>
                      <Link to="/saved" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        <FaHeart /> Saved Properties
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item logout-btn">
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn-register" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button className="mobile-toggle" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
