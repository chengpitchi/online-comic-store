const router = require('express').Router();
const sequelize = require('../../config/connection'); 
const { OrderItem } = require('../../models');
const withAuth = require('../../utils/auth'); 

router.post('/', withAuth, async (req, res) => {
    try {
      const orderItemData = await OrderItem.create(req.body);

      res.status(200).json(orderItemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put('/:id', withAuth, async (req, res) => {
// update a orderItem by its `id` value
try {
    const orderItemData = await OrderItem.update(req.body, {
    where: {
        id: req.params.id,
    },
    });

    if (!orderItemData) {
    res.status(404).json({ message: 'No order Item found with that id!' });
    return;
    }

    res.status(200).json(orderItemData);
} catch (err) {
    res.status(500).json(err);
}
});

router.delete('/:id', withAuth, async (req, res) => {
// delete a order item by its `id` value
try {
    const orderItemData = await OrderItem.destroy({
    where: {
        id: req.params.id,
    },
    });

    if (!orderItemData) {
    res.status(404).json({ message: 'No order Item found with that id!' });
    return;
    }

    res.status(200).json(orderItemData);
} catch (err) {
    res.status(500).json(err);
}
});
  
module.exports = router;