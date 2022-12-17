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
    res.render('checkout', {
      order, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id, 
      user_name: req.session.user_name, 
      order_id: req.session.order_id, 
      order_count: req.session.order_count,  
    });
} catch (err) {
    res.status(500).json(err);
  }
});

// add the order item count and save to the session
router.get('/orderCount/:id', async (req, res) => {
  try {
    req.session.order_count++; 

    res.status(200).json(req.session.order_count); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const orderData = await Order.create(req.body);
    res.status(200).json(orderData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
