const router = require('express').Router();
const sequelize = require('../../config/connection'); 
const { Product, Order, User, OrderItem } = require('../../models');

// get order by id, include User, OrderItem and Product (in OrderItem model)
router.get('/:id', async (req, res) => {
  try {
    const orderData = await Order.findByPk(req.params.id, {
      include: [{ model: User }, 
                { model: OrderItem, include: [ { model: Product }] }], 
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM order_item WHERE order_item.order_id = order.id)'
            ),
            'orderCount',
          ],
          [
            sequelize.literal(
              '(SELECT SUM(order_item.total_price) FROM order_item WHERE order_item.order_id = order.id)'
            ),
            'totalAmount',
          ],
        ],
      },         
    });

    if (!orderData) {
      res.status(404).json({ message: 'No order found with that id!' });
      return;
    }

    const order = orderData.get({ plain: true });
    console.log(order);
    res.render('checkout', {
      order, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id, 
    });
} catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
