import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt, FaTimes, FaImage } from 'react-icons/fa';
import './AddProperty.css';

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    furnishingStatus: 'semi-furnished',
    price: '',
    securityDeposit: '',
    bedrooms: '',
    bathrooms: '',
    area: { value: '', unit: 'sqft' },
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
    },
    amenities: [],
  });

  const amenitiesList = [
    'WiFi', 'Parking', 'AC', 'Gym', 'Swimming Pool', 'Security',
    'Power Backup', 'Lift', 'Garden', 'Club House', 'Play Area', 'CCTV'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAmenityToggle = (amenity) => {
    const amenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + selectedFiles.length > 10) {
      toast.error('You can upload maximum 10 images');
      return;
    }

    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    setSelectedFiles([...selectedFiles, ...files]);
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the object URL to free memory
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const removeUploadedImage = (index) => {
    const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newUploadedImages);
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select images to upload');
      return;
    }

    setUploadingImages(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await api.post('/properties/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedImages([...uploadedImages, ...response.data.images]);
      setSelectedFiles([]);
      setPreviewUrls([]);
      toast.success('Images uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload images');
      console.error(error);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadedImages.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true);
    try {
      const propertyData = {
        ...formData,
        images: uploadedImages,
      };

      await api.post('/properties', propertyData);
      toast.success('Property added successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-page">
      <div className="container">
        <div className="page-header">
          <h1>List Your Property</h1>
          <p>Fill in the details to list your property on RentiGo</p>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          {/* Image Upload Section */}
          <div className="form-section">
            <h3>Property Images</h3>
            <p className="section-description">Upload high-quality images of your property (Maximum 10 images)</p>
            
            <div className="image-upload-area">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
              
              <label htmlFor="images" className="upload-box">
                <FaCloudUploadAlt />
                <span>Click to select images</span>
                <small>PNG, JPG, WEBP up to 5MB each</small>
              </label>

              {selectedFiles.length > 0 && (
                <button
                  type="button"
                  onClick={uploadImages}
                  className="btn btn-primary"
                  disabled={uploadingImages}
                >
                  {uploadingImages ? 'Uploading...' : `Upload ${selectedFiles.length} Image(s)`}
                </button>
              )}
            </div>

            {/* Preview Selected Images */}
            {previewUrls.length > 0 && (
              <div className="image-preview-grid">
                <h4>Selected Images (Not uploaded yet)</h4>
                <div className="preview-grid">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="preview-item">
                      <img src={url} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeImage(index)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="image-preview-grid">
                <h4>Uploaded Images ({uploadedImages.length})</h4>
                <div className="preview-grid">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="preview-item uploaded">
                      <img src={image.url} alt={`Uploaded ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeUploadedImage(index)}
                      >
                        <FaTimes />
                      </button>
                      <div className="uploaded-badge">
                        <FaImage /> Uploaded
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">Property Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="e.g., Spacious 3BHK Apartment in Downtown"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                className="form-control"
                rows="5"
                placeholder="Describe your property in detail..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Property Type *</label>
                <select
                  name="propertyType"
                  className="form-control form-select"
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="studio">Studio</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="duplex">Duplex</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Furnishing Status *</label>
                <select
                  name="furnishingStatus"
                  className="form-control form-select"
                  value={formData.furnishingStatus}
                  onChange={handleChange}
                >
                  <option value="fully-furnished">Fully Furnished</option>
                  <option value="semi-furnished">Semi Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Monthly Rent (₹) *</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="e.g., 25000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Security Deposit (₹) *</label>
                <input
                  type="number"
                  name="securityDeposit"
                  className="form-control"
                  placeholder="e.g., 50000"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Bedrooms *</label>
                <input
                  type="number"
                  name="bedrooms"
                  className="form-control"
                  placeholder="e.g., 3"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bathrooms *</label>
                <input
                  type="number"
                  name="bathrooms"
                  className="form-control"
                  placeholder="e.g., 2"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Area (sqft) *</label>
                <input
                  type="number"
                  name="area.value"
                  className="form-control"
                  placeholder="e.g., 1500"
                  value={formData.area.value}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="form-section">
            <h3>Address</h3>
            <div className="form-group">
              <label className="form-label">Street Address *</label>
              <input
                type="text"
                name="address.street"
                className="form-control"
                placeholder="e.g., 123 Main Street, Block A"
                value={formData.address.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  name="address.city"
                  className="form-control"
                  placeholder="e.g., Mumbai"
                  value={formData.address.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  name="address.state"
                  className="form-control"
                  placeholder="e.g., Maharashtra"
                  value={formData.address.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pincode *</label>
                <input
                  type="text"
                  name="address.pincode"
                  className="form-control"
                  placeholder="e.g., 400001"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Landmark (Optional)</label>
              <input
                type="text"
                name="address.landmark"
                className="form-control"
                placeholder="e.g., Near Central Mall"
                value={formData.address.landmark}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="form-section">
            <h3>Amenities</h3>
            <div className="amenities-selector">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={loading || uploadedImages.length === 0}
            >
              {loading ? 'Listing Property...' : 'List Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
