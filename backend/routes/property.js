const express = require('express');
const router = express.Router();
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  saveProperty,
  getMyProperties,
  uploadPropertyImages,
  getAllProperties,
} = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getProperties);
router.get('/:id', getProperty);

// Protected routes
router.post('/', protect, authorize('owner', 'admin'), createProperty);
router.post('/upload-images', protect, authorize('owner', 'admin'), upload.array('images', 10), uploadPropertyImages);
router.put('/:id', protect, authorize('owner', 'admin'), updateProperty);
router.delete('/:id', protect, authorize('owner', 'admin'), deleteProperty);
router.post('/:id/save', protect, saveProperty);

// Owner/Admin routes
router.get('/my/properties', protect, authorize('owner', 'admin'), getMyProperties);
router.get('/admin/all', protect, authorize('admin'), getAllProperties);

module.exports = router;
