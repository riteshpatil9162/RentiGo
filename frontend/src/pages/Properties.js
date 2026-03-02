import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    furnishingStatus: '',
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, v]) => v !== '')
      ).toString();
      
      console.log('Fetching properties from:', `/properties?${queryParams}`);
      const response = await api.get(`/properties?${queryParams}`);
      console.log('Response received:', response.data);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      console.error('Error response:', error.response);
      toast.error('Failed to fetch properties: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      city: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      furnishingStatus: '',
    });
  };

  return (
    <div className="properties-page">
      <div className="container">
        <div className="page-header">
          <h1>Find Your Perfect Home</h1>
          <p>Explore our wide range of rental properties</p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="Search by location or title..."
              value={filters.search}
              onChange={handleFilterChange}
            />

            <select
              name="propertyType"
              className="form-control form-select"
              value={filters.propertyType}
              onChange={handleFilterChange}
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Penthouse</option>
              <option value="duplex">Duplex</option>
            </select>

            <select
              name="bedrooms"
              className="form-control form-select"
              value={filters.bedrooms}
              onChange={handleFilterChange}
            >
              <option value="">Bedrooms</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </select>

            <select
              name="furnishingStatus"
              className="form-control form-select"
              value={filters.furnishingStatus}
              onChange={handleFilterChange}
            >
              <option value="">Furnishing</option>
              <option value="fully-furnished">Fully Furnished</option>
              <option value="semi-furnished">Semi Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>

            <input
              type="number"
              name="minPrice"
              className="form-control"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />

            <input
              type="number"
              name="maxPrice"
              className="form-control"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />

            <button onClick={resetFilters} className="btn btn-secondary">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="spinner"></div>
        ) : properties.length > 0 ? (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No properties found</h3>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PropertyCard = ({ property }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/properties/${property._id}/save`);
      setIsSaved(!isSaved);
      toast.success(isSaved ? 'Removed from saved' : 'Saved successfully');
    } catch (error) {
      toast.error('Please login to save properties');
    }
  };

  return (
    <Link to={`/properties/${property._id}`} className="property-card">
      <div className="property-image" style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
        <img
          src={property.images[0]?.url || 'https://via.placeholder.com/400x300'}
          alt={property.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
        <button className="save-btn" onClick={handleSave}>
          {isSaved ? <FaHeart /> : <FaRegHeart />}
        </button>
        <div className="property-badge">{property.propertyType}</div>
      </div>

      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">
          <FaMapMarkerAlt />
          {property.address.city}, {property.address.state}
        </p>

        <div className="property-features">
          <span>
            <FaBed /> {property.bedrooms} Beds
          </span>
          <span>
            <FaBath /> {property.bathrooms} Baths
          </span>
          <span>
            <FaRuler /> {property.area.value} {property.area.unit}
          </span>
        </div>

        <div className="property-footer">
          <div className="property-price">
            <span className="price-amount">₹{property.price.toLocaleString()}</span>
            <span className="price-period">/month</span>
          </div>
          <span className="property-status">{property.availability}</span>
        </div>
      </div>
    </Link>
  );
};

export default Properties;
