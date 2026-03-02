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
  FaEdit,
  FaEye,
  FaCheckCircle,
  FaTimesCircle 
} from 'react-icons/fa';
import './AdminProperties.css';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, available, rented

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const fetchAllProperties = async () => {
    try {
      const response = await api.get('/properties/admin/all');
      setProperties(response.data.properties);
    } catch (error) {
      toast.error('Failed to fetch properties');
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

  const filteredProperties = properties.filter(property => {
    if (filter === 'all') return true;
    if (filter === 'available') return property.availability === 'available';
    if (filter === 'rented') return property.availability === 'rented';
    return true;
  });

  if (loading) {
    return <div className="spinner-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-properties-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>All Properties</h1>
            <p>Manage all properties on the platform</p>
          </div>
          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-value">{properties.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {properties.filter(p => p.availability === 'available').length}
              </span>
              <span className="stat-label">Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {properties.filter(p => p.availability === 'rented').length}
              </span>
              <span className="stat-label">Rented</span>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Properties
          </button>
          <button 
            className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
          <button 
            className={`filter-btn ${filter === 'rented' ? 'active' : ''}`}
            onClick={() => setFilter('rented')}
          >
            Rented
          </button>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="empty-state">
            <h3>No properties found</h3>
            <p>There are no properties matching your filter</p>
          </div>
        ) : (
          <div className="properties-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Property</th>
                  <th>Owner</th>
                  <th>Location</th>
                  <th>Details</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property._id}>
                    <td>
                      <div className="property-image">
                        <img 
                          src={property.images[0]?.url || 'https://via.placeholder.com/100x80'} 
                          alt={property.title}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="property-info">
                        <h4>{property.title}</h4>
                        <span className="property-type">{property.propertyType}</span>
                      </div>
                    </td>
                    <td>
                      <div className="owner-info">
                        <span className="owner-name">{property.owner?.name || 'N/A'}</span>
                        <span className="owner-email">{property.owner?.email || 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="location-info">
                        <FaMapMarkerAlt className="location-icon" />
                        <div>
                          <span>{property.address.city}</span>
                          <small>{property.address.state}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="property-details">
                        <span><FaBed /> {property.bedrooms} BD</span>
                        <span><FaBath /> {property.bathrooms} BA</span>
                        <span><FaRuler /> {property.area.value} sqft</span>
                      </div>
                    </td>
                    <td>
                      <div className="price-info">
                        <span className="price">₹{property.price.toLocaleString()}</span>
                        <small>/month</small>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${property.availability}`}>
                        {property.availability === 'available' ? (
                          <><FaCheckCircle /> Available</>
                        ) : (
                          <><FaTimesCircle /> Rented</>
                        )}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProperties;
