const router = require('express').Router();
const { Product, Category, Review } = require('../../models');

// get product by id
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Review, include: [{ model: Review.User }] }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    const product = productData.get({ plain: true });
    res.render('productItem', product);
} catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
