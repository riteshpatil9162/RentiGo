import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUser, FaHome, FaClipboardList, FaHeart, FaCog, FaBuilding } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const cards = [
    {
      title: 'Profile',
      icon: <FaUser />,
      link: '/profile',
      color: '#3b82f6',
    },
    {
      title: 'My Bookings',
      icon: <FaClipboardList />,
      link: '/my-bookings',
      color: '#10b981',
    },
    {
      title: 'Saved Properties',
      icon: <FaHeart />,
      link: '/saved',
      color: '#ef4444',
    },
  ];

  if (user?.role === 'owner' || user?.role === 'admin') {
    cards.unshift({
      title: 'Add Property',
      icon: <FaHome />,
      link: '/add-property',
      color: '#f59e0b',
    });
    cards.push({
      title: 'My Properties',
      icon: <FaBuilding />,
      link: '/my-properties',
      color: '#06b6d4',
    });
  }

  if (user?.role === 'admin') {
    cards.push({
      title: 'Manage All Properties',
      icon: <FaCog />,
      link: '/admin/properties',
      color: '#8b5cf6',
    });
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Manage your account and listings</p>
        </div>

        <div className="dashboard-grid">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="dashboard-card"
              style={{ borderTop: `4px solid ${card.color}` }}
            >
              <div className="card-icon" style={{ color: card.color }}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
