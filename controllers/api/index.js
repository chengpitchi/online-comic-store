const router = require('express').Router();
const productRoutes = require('./productRoutes');
const reviewRoutes = require('./reviewRoutes'); 

router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes); 

module.exports = router;