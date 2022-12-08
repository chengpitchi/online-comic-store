const router = require('express').Router();
const { Review } = require('../../models');

// add a new review
router.post('/', async (req, res) => {
  try {
    console.log(req); 
    const reviewData = await Review.create(req.body);
    res.status(200).json(reviewData);
    
    // after adding the review, refresh the product by id 
    res.redirect(`/api/products/${req.body.product_id}`); 
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
