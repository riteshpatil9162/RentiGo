const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get saved properties
// @route   GET /api/users/saved/properties
// @access  Private
exports.getSavedProperties = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedProperties',
      populate: {
        path: 'owner',
        select: 'name email phone',
      },
    });

    res.json({
      success: true,
      count: user.savedProperties.length,
      properties: user.savedProperties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
