const router = require('express').Router();
const productRoutes = require('./productRoutes');
const reviewRoutes = require('./reviewRoutes'); 
const userRoutes = require('./userRoutes'); 
const orderRoutes = require('./orderRoutes');
const orderItemRoutes = require('./orderItemRoutes');

router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes); 
router.use('/users', userRoutes); 
router.use('/orders', orderRoutes);
router.use('/orderItems', orderItemRoutes); 

module.exports = router;