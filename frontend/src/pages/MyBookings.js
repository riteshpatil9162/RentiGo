import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data.bookings);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="bookings-page">
      <div className="container">
        <h1>My Bookings</h1>

        {bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-image">
                  <img
                    src={booking.property?.images[0]?.url || 'https://via.placeholder.com/300x200'}
                    alt={booking.property?.title}
                  />
                </div>
                <div className="booking-details">
                  <h3>{booking.property?.title}</h3>
                  <p>
                    <strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Monthly Rent:</strong> ₹{booking.monthlyRent.toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`status-badge status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No bookings yet</h3>
            <p>Start exploring properties and make your first booking!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
