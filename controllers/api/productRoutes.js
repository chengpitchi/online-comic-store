const router = require('express').Router();
const { Product, Category, Review, User } = require('../../models');

// get product by id, include Category, review and user (in review model)
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, 
                { model: Review, include: [ { model: User }] }]
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    const product = productData.get({ plain: true });
    console.log(product); 
    res.render('productItem', product);
} catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
