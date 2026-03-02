const express = require('express');
const router = express.Router();
const { upload, uploadAvatar } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

// @route   POST /api/upload/avatar
// @desc    Upload user avatar
// @access  Private
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);

module.exports = router;
