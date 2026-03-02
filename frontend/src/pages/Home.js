import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaShieldAlt, FaHandshake, FaArrowRight, FaCheckCircle, FaUsers, FaBuilding } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${searchQuery}`);
    } else {
      navigate('/properties');
    }
  };

  const features = [
    {
      icon: <FaSearch />,
      title: 'Smart Search',
      description: 'Find your perfect home with our advanced search filters and intuitive interface powered by AI.',
    },
    {
      icon: <FaHome />,
      title: 'Verified Listings',
      description: 'All properties are thoroughly verified for authenticity and quality assurance.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with industry-standard encryption.',
    },
    {
      icon: <FaHandshake />,
      title: 'Trusted Platform',
      description: 'Connect with verified owners and tenants in a secure, trusted environment.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Browse Properties',
      description: 'Explore our extensive collection of rental properties across India.',
    },
    {
      number: '2',
      title: 'Schedule Viewing',
      description: 'Book a convenient time to view properties that match your needs.',
    },
    {
      number: '3',
      title: 'Secure Payment',
      description: 'Complete your booking with our secure payment gateway.',
    },
    {
      number: '4',
      title: 'Move In',
      description: 'Get your keys and move into your new home hassle-free.',
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaCheckCircle /> Trusted by 10,000+ Happy Renters
            </div>
            <h1 className="hero-title">
              Find Your Perfect
              <br />
              <span className="highlight">Rental Home</span>
            </h1>
            <p className="hero-subtitle">
              Discover thousands of verified properties available for rent across India.
              Your dream home is just a search away.
            </p>

            <form onSubmit={handleSearch} className="hero-search">
              <FaSearch style={{ color: 'var(--text-light)', fontSize: '1.25rem', marginLeft: '0.5rem' }} />
              <input
                type="text"
                placeholder="Search by city, locality, or property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Search <FaArrowRight />
              </button>
            </form>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">5000+</div>
                <div className="stat-label">Properties Listed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Happy Tenants</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Why Choose Us</div>
            <h2>Why RentiGo is Your Best Choice</h2>
            <p>We provide the best platform for finding and listing rental properties with complete transparency and security</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">How It Works</div>
            <h2>Find Your Home in 4 Simple Steps</h2>
            <p>Our streamlined process makes finding and renting your perfect home easier than ever</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Next Home?</h2>
            <p>Join thousands of happy tenants and property owners on RentiGo. Start your journey to finding the perfect rental home today.</p>
            <div className="cta-buttons">
              <Link to="/properties" className="btn btn-primary btn-lg">
                Browse Properties <FaArrowRight />
              </Link>
              <Link to="/register" className="btn btn-dark btn-lg">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
