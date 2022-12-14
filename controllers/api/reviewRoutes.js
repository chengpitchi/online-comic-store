const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth'); 

// add a new review
router.post('/', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.create(req.body);
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
