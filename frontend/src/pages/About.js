import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaShieldAlt, FaAward, FaHandshake, FaChartLine } from 'react-icons/fa';
import './About.css';

const About = () => {
  const stats = [
    { icon: <FaHome />, number: '10,000+', label: 'Properties Listed' },
    { icon: <FaUsers />, number: '50,000+', label: 'Happy Tenants' },
    { icon: <FaHandshake />, number: '5,000+', label: 'Property Owners' },
    { icon: <FaAward />, number: '15+', label: 'Years Experience' },
  ];

  const values = [
    {
      icon: <FaShieldAlt />,
      title: 'Trust & Security',
      description: 'We verify every property and user to ensure a safe rental experience for everyone.',
    },
    {
      icon: <FaUsers />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide 24/7 support to help you at every step.',
    },
    {
      icon: <FaChartLine />,
      title: 'Innovation',
      description: 'We use cutting-edge technology to make property rental simple, fast, and efficient.',
    },
    {
      icon: <FaHandshake />,
      title: 'Transparency',
      description: 'No hidden fees, no surprises. We believe in honest and transparent dealings.',
    },
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Amit Patel',
      role: 'Chief Technology Officer',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    {
      name: 'Sneha Reddy',
      role: 'Customer Success Manager',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About RentiGo</h1>
            <p className="hero-subtitle">
              Transforming the way people find their perfect home
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, RentiGo started with a simple mission: to make house hunting stress-free 
                and transparent. We saw how difficult it was for tenants to find trustworthy properties and 
                for owners to reach genuine renters.
              </p>
              <p>
                Today, we've grown into India's leading rental platform, connecting thousands of property 
                owners with tenants across major cities. Our platform has facilitated over 100,000 successful 
                rentals, helping families find their dream homes.
              </p>
              <p>
                We're not just a listing platform – we're your trusted partner in the journey to finding or 
                renting out the perfect property. With advanced technology, verified listings, and dedicated 
                customer support, we make renting simple and secure.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" 
                alt="Modern apartment building"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <h2>Our Mission</h2>
              <p>
                To revolutionize the rental housing market by providing a transparent, secure, and 
                user-friendly platform that connects property owners with tenants, making the entire 
                rental process seamless and trustworthy.
              </p>
            </div>
            <div className="vision-card">
              <h2>Our Vision</h2>
              <p>
                To become the most trusted and preferred rental platform in India, where every family 
                can find their perfect home with confidence, and every property owner can rent out 
                their property hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Passionate professionals dedicated to making your rental experience exceptional
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Home?</h2>
            <p>Join thousands of happy tenants who found their dream rental with RentiGo</p>
            <div className="cta-buttons">
              <Link to="/properties" className="btn btn-primary">
                Browse Properties
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
