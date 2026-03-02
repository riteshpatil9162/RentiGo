import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaStar, FaCrown, FaRocket } from 'react-icons/fa';
import './Pricing.css';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      icon: <FaStar />,
      description: 'Perfect for individual property owners',
      monthlyPrice: 0,
      yearlyPrice: 0,
      color: '#10b981',
      features: [
        { text: 'List up to 2 properties', included: true },
        { text: 'Basic property details', included: true },
        { text: 'Up to 5 property images', included: true },
        { text: 'Standard support', included: true },
        { text: 'Property analytics', included: false },
        { text: 'Featured listings', included: false },
        { text: 'Priority support', included: false },
        { text: 'Verified badge', included: false },
      ],
      popular: false,
    },
    {
      name: 'Professional',
      icon: <FaCrown />,
      description: 'Best for growing property businesses',
      monthlyPrice: 999,
      yearlyPrice: 9990,
      color: '#3b82f6',
      features: [
        { text: 'List up to 10 properties', included: true },
        { text: 'Advanced property details', included: true },
        { text: 'Up to 20 property images', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Property analytics', included: true },
        { text: '3 Featured listings/month', included: true },
        { text: 'Verified owner badge', included: true },
        { text: 'Custom branding', included: false },
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      icon: <FaRocket />,
      description: 'For large-scale property management',
      monthlyPrice: 2499,
      yearlyPrice: 24990,
      color: '#8b5cf6',
      features: [
        { text: 'Unlimited property listings', included: true },
        { text: 'Premium property showcase', included: true },
        { text: 'Unlimited property images', included: true },
        { text: '24/7 Priority support', included: true },
        { text: 'Advanced analytics & reports', included: true },
        { text: 'Unlimited featured listings', included: true },
        { text: 'Premium verified badge', included: true },
        { text: 'Custom branding & API access', included: true },
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'Can I change my plan later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through our secure payment gateway.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! You can start with our Basic plan for free. No credit card required.',
    },
    {
      question: 'What happens if I exceed my listing limit?',
      answer: 'You can upgrade to a higher plan or purchase additional listing slots separately.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans if you\'re not satisfied.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription anytime. Your listings will remain active until the end of the billing period.',
    },
  ];

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <h1>Choose Your Plan</h1>
          <p>Select the perfect plan for your property listing needs</p>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <button
              className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
              <span className="discount-badge">Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                style={{ '--plan-color': plan.color }}
              >
                {plan.popular && <div className="popular-badge">Most Popular</div>}

                <div className="plan-header">
                  <div className="plan-icon" style={{ color: plan.color }}>
                    {plan.icon}
                  </div>
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-price">
                  <div className="price-amount">
                    <span className="currency">₹</span>
                    <span className="amount">
                      {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="period">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && plan.yearlyPrice > 0 && (
                    <p className="savings">
                      Save ₹{plan.monthlyPrice * 12 - plan.yearlyPrice} per year
                    </p>
                  )}
                </div>

                <div className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className={`feature-item ${feature.included ? '' : 'disabled'}`}>
                      <div className="feature-icon" style={{ color: feature.included ? plan.color : '#cbd5e1' }}>
                        {feature.included ? <FaCheck /> : <FaTimes />}
                      </div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={plan.monthlyPrice === 0 ? '/register' : '/dashboard'}
                  className="plan-btn"
                  style={{ background: plan.color }}
                >
                  {plan.monthlyPrice === 0 ? 'Get Started Free' : 'Choose Plan'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="features-comparison">
        <div className="container">
          <h2>Compare All Features</h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic</th>
                  <th>Professional</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Property Listings</td>
                  <td>Up to 2</td>
                  <td>Up to 10</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Property Images</td>
                  <td>5 per property</td>
                  <td>20 per property</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Featured Listings</td>
                  <td><FaTimes className="no-icon" /></td>
                  <td>3 per month</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Analytics Dashboard</td>
                  <td><FaTimes className="no-icon" /></td>
                  <td><FaCheck className="yes-icon" /></td>
                  <td><FaCheck className="yes-icon" /></td>
                </tr>
                <tr>
                  <td>Verified Badge</td>
                  <td><FaTimes className="no-icon" /></td>
                  <td><FaCheck className="yes-icon" /></td>
                  <td><FaCheck className="yes-icon" /></td>
                </tr>
                <tr>
                  <td>Priority Support</td>
                  <td><FaTimes className="no-icon" /></td>
                  <td>Email</td>
                  <td>24/7 Phone & Email</td>
                </tr>
                <tr>
                  <td>Custom Branding</td>
                  <td><FaTimes className="no-icon" /></td>
                  <td><FaTimes className="no-icon" /></td>
                  <td><FaCheck className="yes-icon" /></td>
                </tr>
                <tr>
                  <td>API Access</td>
                  <td><FaTimes className="no-icon" /></td>
                  <td><FaTimes className="no-icon" /></td>
                  <td><FaCheck className="yes-icon" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pricing-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container">
          <h2>Still Have Questions?</h2>
          <p>Our team is here to help you choose the right plan</p>
          <Link to="/contact" className="btn btn-primary btn-large">
            Contact Sales Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
