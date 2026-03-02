const multer = require('multer');
const { uploadToCloudinary } = require('../utils/cloudinary');
const User = require('../models/User');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// @desc    Upload avatar image
// @route   POST /api/upload/avatar
// @access  Private
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file',
      });
    }

    console.log('Uploading avatar for user:', req.user.id);
    console.log('File size:', req.file.size, 'bytes');
    console.log('File type:', req.file.mimetype);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(
      req.file.buffer,
      'rentigo/avatars'
    );

    console.log('Upload successful:', result.url);

    // Update user avatar in database
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: result.url },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      avatar: result.url,
      user: user,
    });
  } catch (error) {
    console.error('Avatar Upload Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload avatar',
      error: error.message,
    });
  }
};

module.exports = {
  upload,
  uploadAvatar,
};
