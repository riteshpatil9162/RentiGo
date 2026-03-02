import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { 
  FaBed, 
  FaBath, 
  FaRuler, 
  FaMapMarkerAlt, 
  FaTrash, 
  FaEye,
  FaPlus
} from 'react-icons/fa';
import './MyProperties.css';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await api.get('/properties/my/properties');
      setProperties(response.data.properties);
    } catch (error) {
      toast.error('Failed to fetch your properties');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter(p => p._id !== id));
      toast.success('Property deleted successfully');
    } catch (error) {
      toast.error('Failed to delete property');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="spinner-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="my-properties-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>My Properties</h1>
            <p>Manage your listed properties</p>
          </div>
          <Link to="/add-property" className="btn btn-primary">
            <FaPlus /> Add New Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="empty-state">
            <h3>No Properties Listed Yet</h3>
            <p>Start listing your properties to reach potential tenants</p>
            <Link to="/add-property" className="btn btn-primary">
              <FaPlus /> List Your First Property
            </Link>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property._id} className="property-card">
                <div className="property-image">
                  <img 
                    src={property.images[0]?.url || 'https://via.placeholder.com/400x250'} 
                    alt={property.title}
                  />
                  <span className={`status-badge ${property.availability}`}>
                    {property.availability}
                  </span>
                </div>

                <div className="property-body">
                  <h3>{property.title}</h3>
                  
                  <p className="location">
                    <FaMapMarkerAlt />
                    {property.address.city}, {property.address.state}
                  </p>

                  <div className="property-features">
                    <span><FaBed /> {property.bedrooms} BD</span>
                    <span><FaBath /> {property.bathrooms} BA</span>
                    <span><FaRuler /> {property.area.value} sqft</span>
                  </div>

                  <div className="property-footer">
                    <div className="price">
                      <span className="amount">₹{property.price.toLocaleString()}</span>
                      <span className="period">/month</span>
                    </div>

                    <div className="actions">
                      <Link 
                        to={`/properties/${property._id}`}
                        className="action-btn view-btn"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>
                      <button
                        onClick={() => handleDelete(property._id, property.title)}
                        className="action-btn delete-btn"
                        title="Delete Property"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
