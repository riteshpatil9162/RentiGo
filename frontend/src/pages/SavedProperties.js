import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './SavedProperties.css';

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    try {
      const response = await api.get('/users/saved/properties');
      setProperties(response.data.properties);
    } catch (error) {
      toast.error('Failed to fetch saved properties');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="saved-properties-page">
      <div className="container">
        <h1>Saved Properties</h1>

        {properties.length > 0 ? (
          <div className="properties-grid">
            {properties.map((property) => (
              <Link key={property._id} to={`/property/${property._id}`} className="property-card">
                <div className="property-image">
                  <img
                    src={property.images[0]?.url || 'https://via.placeholder.com/400x300'}
                    alt={property.title}
                  />
                </div>
                <div className="property-details">
                  <h3>{property.title}</h3>
                  <p className="location">
                    <FaMapMarkerAlt />
                    {property.address.city}, {property.address.state}
                  </p>
                  <div className="property-features">
                    <span><FaBed /> {property.bedrooms} Beds</span>
                    <span><FaBath /> {property.bathrooms} Baths</span>
                    <span><FaRuler /> {property.area.value} {property.area.unit}</span>
                  </div>
                  <div className="property-price">
                    ₹{property.price.toLocaleString()}/month
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No saved properties</h3>
            <p>Start saving properties you're interested in!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProperties;
