import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    message: '',
  });

  useEffect(() => {
    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${id}`);
      setProperty(response.data.property);
    } catch (error) {
      toast.error('Failed to fetch property details');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.info('Please login to book a property');
      navigate('/login');
      return;
    }

    try {
      const response = await api.post('/bookings', {
        propertyId: id,
        ...bookingData,
      });

      // Initiate payment
      const { order, key } = await createRazorpayOrder(response.data.booking._id);
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: 'RentiGo',
        description: 'Property Booking Payment',
        order_id: order.id,
        handler: async (response) => {
          await verifyPayment(response, response.data.booking._id);
          toast.success('Booking confirmed!');
          navigate('/my-bookings');
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('Booking failed');
    }
  };

  const createRazorpayOrder = async (bookingId) => {
    const response = await api.post('/payments/create-order', { bookingId });
    return response.data;
  };

  const verifyPayment = async (paymentData, bookingId) => {
    await api.post('/payments/verify', { ...paymentData, bookingId });
  };

  if (loading) return <div className="spinner"></div>;
  if (!property) return <div className="container">Property not found</div>;

  return (
    <div className="property-details-page">
      <div className="container">
        <div className="property-images">
          {property.images && property.images.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="property-swiper"
            >
              {property.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.url}
                    alt={`Property view ${index + 1}`}
                    className="main-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src="https://via.placeholder.com/800x500?text=No+Image+Available"
              alt={property.title}
              className="main-image"
            />
          )}
        </div>

        <div className="property-content">
          <div className="property-main">
            <h1>{property.title}</h1>
            <p className="location">
              <FaMapMarkerAlt />
              {property.address.street}, {property.address.city}, {property.address.state}
            </p>

            <div className="property-meta">
              <span><FaBed /> {property.bedrooms} Bedrooms</span>
              <span><FaBath /> {property.bathrooms} Bathrooms</span>
              <span><FaRuler /> {property.area.value} {property.area.unit}</span>
            </div>

            <div className="property-description">
              <h3>About this property</h3>
              <p>{property.description}</p>
            </div>

            <div className="amenities">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-tag">{amenity}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="property-sidebar">
            <div className="booking-card">
              <div className="price-section">
                <h2>₹{property.price.toLocaleString()}</h2>
                <span>/month</span>
              </div>

              <div className="detail-item">
                <span>Security Deposit</span>
                <span>₹{property.securityDeposit.toLocaleString()}</span>
              </div>

              <div className="detail-item">
                <span>Furnishing</span>
                <span className="capitalize">{property.furnishingStatus.replace('-', ' ')}</span>
              </div>

              <div className="detail-item">
                <span>Availability</span>
                <span className="capitalize">{property.availability}</span>
              </div>

              {!showBookingForm ? (
                <button 
                  className="btn btn-primary btn-block"
                  onClick={() => setShowBookingForm(true)}
                  disabled={property.availability !== 'available'}
                >
                  Book Now
                </button>
              ) : (
                <form onSubmit={handleBooking} className="booking-form">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={bookingData.startDate}
                      onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={bookingData.endDate}
                      onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Message (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={bookingData.message}
                      onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Proceed to Payment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
