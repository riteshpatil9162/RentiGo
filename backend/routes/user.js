const express = require('express');
const router = express.Router();
const { getUserProfile, getSavedProperties } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/:id', getUserProfile);
router.get('/saved/properties', getSavedProperties);

module.exports = router;
