import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaUser, FaMoneyBillWave, FaShieldAlt, FaCog, FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Help.css';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: <FaQuestionCircle /> },
    { id: 'getting-started', name: 'Getting Started', icon: <FaHome /> },
    { id: 'account', name: 'Account & Profile', icon: <FaUser /> },
    { id: 'payments', name: 'Payments & Billing', icon: <FaMoneyBillWave /> },
    { id: 'security', name: 'Security & Privacy', icon: <FaShieldAlt /> },
    { id: 'technical', name: 'Technical Support', icon: <FaCog /> },
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I create an account on RentiGo?',
      answer: 'Click on the "Sign Up" button in the top right corner. Fill in your name, email, phone number, password, and select your role (Tenant or Property Owner). Once submitted, you\'ll receive a verification email. Click the link to verify your account and you\'re all set!',
    },
    {
      category: 'getting-started',
      question: 'How do I search for properties?',
      answer: 'Navigate to the "Properties" page from the main menu. Use the search filters to narrow down your options by location, property type, price range, number of bedrooms, and amenities. Click on any property card to view detailed information and images.',
    },
    {
      category: 'getting-started',
      question: 'How do I list my property?',
      answer: 'After logging in as a Property Owner, go to your Dashboard and click "Add Property" or "List Property" from the navigation menu. Fill in all the required details including property type, location, rent amount, amenities, and upload high-quality images. Submit the form and your property will be reviewed and published within 24 hours.',
    },
    {
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to Dashboard > Profile. You can update your name, phone number, and profile picture. Click "Update Profile" to save changes. Note that email addresses cannot be changed for security reasons.',
    },
    {
      category: 'account',
      question: 'How do I change my password?',
      answer: 'Navigate to your Profile page and scroll to the "Change Password" section. Enter your current password, then your new password twice to confirm. Click "Change Password" to update. Make sure your new password is at least 6 characters long.',
    },
    {
      category: 'account',
      question: 'Can I have both tenant and owner accounts?',
      answer: 'Yes! You can switch between roles or have separate accounts. If you want to both rent properties and list your own, we recommend registering as an owner, as you\'ll have access to all features.',
    },
    {
      category: 'payments',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major payment methods including credit cards, debit cards, UPI, net banking, and popular digital wallets through our secure Razorpay payment gateway. All transactions are encrypted and secure.',
    },
    {
      category: 'payments',
      question: 'Is there a security deposit?',
      answer: 'Yes, most properties require a refundable security deposit, typically equivalent to 1-2 months\' rent. The exact amount is specified in each property listing. The deposit is refunded when you vacate the property, subject to property condition inspection.',
    },
    {
      category: 'payments',
      question: 'How do I get a refund?',
      answer: 'If you cancel a booking within the cancellation period specified in the booking terms, you\'re eligible for a refund. Contact our support team with your booking ID. Refunds are processed within 7-10 business days to your original payment method.',
    },
    {
      category: 'payments',
      question: 'What are the pricing plans for property owners?',
      answer: 'We offer three plans: Basic (Free - 2 properties), Professional (₹999/month - 10 properties with featured listings), and Enterprise (₹2499/month - unlimited properties with premium features). Visit our Pricing page for detailed comparison.',
    },
    {
      category: 'security',
      question: 'How is my personal data protected?',
      answer: 'We use industry-standard encryption (SSL/TLS) to protect all data transmissions. Your personal information is stored securely and never shared with third parties without your consent. We comply with data protection regulations and have strict privacy policies in place.',
    },
    {
      category: 'security',
      question: 'Are all properties verified?',
      answer: 'Yes! We verify property ownership documents and conduct basic checks for all listings. Premium verified properties undergo additional verification including physical inspection. Look for the "Verified" badge on property listings.',
    },
    {
      category: 'security',
      question: 'How do I report a suspicious listing?',
      answer: 'If you encounter a suspicious listing, click the "Report" button on the property details page or contact our support team immediately at support@rentigo.com. We take such reports seriously and investigate within 24 hours.',
    },
    {
      category: 'technical',
      question: 'The website is not loading properly. What should I do?',
      answer: 'Try clearing your browser cache and cookies, or try a different browser. Make sure you\'re using an updated browser version (Chrome, Firefox, Safari, or Edge). If the problem persists, check your internet connection or contact our technical support.',
    },
    {
      category: 'technical',
      question: 'I\'m not receiving verification emails. What should I do?',
      answer: 'Check your spam/junk folder. Add contact@rentigo.com to your email whitelist. If you still don\'t receive the email within 10 minutes, click "Resend verification email" on the registration page or contact support.',
    },
    {
      category: 'technical',
      question: 'Can I use RentiGo on my mobile phone?',
      answer: 'Absolutely! RentiGo is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers. Simply visit our website from your mobile browser. We\'re also working on dedicated iOS and Android apps coming soon!',
    },
    {
      category: 'technical',
      question: 'How do I upload property images?',
      answer: 'When adding or editing a property, click the "Upload Images" button. You can select multiple images at once. Supported formats are JPG, PNG, and WebP. Maximum file size is 5MB per image. We recommend using high-resolution images for best results.',
    },
  ];

  const quickLinks = [
    { title: 'Browse Properties', link: '/properties', description: 'Find your perfect rental home' },
    { title: 'List Your Property', link: '/add-property', description: 'Start earning from your property' },
    { title: 'Pricing Plans', link: '/pricing', description: 'View our subscription plans' },
    { title: 'Contact Support', link: '/contact', description: 'Get in touch with our team' },
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="help-page">
      {/* Hero Section */}
      <section className="help-hero">
        <div className="container">
          <h1>How Can We Help You?</h1>
          <p>Search our knowledge base for answers</p>
          
          <div className="help-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="help-search-input"
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links-section">
        <div className="container">
          <div className="quick-links-grid">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.link} className="quick-link-card">
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="help-categories-section">
        <div className="container">
          <h2>Browse by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faqs-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faqs-container">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    {expandedFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No results found for "{searchQuery}". Try different keywords or browse by category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="help-contact">
        <div className="container">
          <div className="help-contact-card">
            <h2>Still Need Help?</h2>
            <p>Can't find the answer you're looking for? Our support team is here to help!</p>
            <div className="contact-buttons">
              <Link to="/contact" className="btn btn-primary">
                Contact Support
              </Link>
              <a href="mailto:support@rentigo.com" className="btn btn-secondary">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
