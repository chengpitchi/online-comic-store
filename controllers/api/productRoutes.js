const router = require('express').Router();
const sequelize = require('../../config/connection'); 
const { Product, Category, Review, User } = require('../../models');

// get product by id, include Category, review and user (in review model)
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, 
                { model: Review, include: [ { model: User }] }], 
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM review WHERE review.product_id = product.id)'
            ),
            'reviewCount',
          ],
        ],
      },         
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    const product = productData.get({ plain: true });

    res.render('productItem', {
      product, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id, 
    });
} catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
