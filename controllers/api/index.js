const router = require('express').Router();
const productRoutes = require('./productRoutes');
const reviewRoutes = require('./reviewRoutes'); 
const userRoutes = require('./userRoutes'); 

router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes); 
router.use('/users', userRoutes); 

module.exports = router;