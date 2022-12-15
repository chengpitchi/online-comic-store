const router = require('express').Router();
const { User, Order } = require('../../models');
const uuID = require('../../utils/uuid'); 
const { QueryTypes } = require('sequelize');
const sequelize = require('../../config/connection'); 

router.post('/', async (req, res) => {
    try {
        console.log("user"); 
        console.log(req.body); 
        const userData = await User.create(req.body.user);

        // add a pending order for the new user
        req.body.order.order_ref = uuID(); 
        req.body.order.user_id = userData.id; 

        const orderData = await Order.create(req.body.order); 

        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.user_name = userData.name; 
          req.session.logged_in = true;
          req.session.order_id = orderData.id; 
          req.session.order_count = 0; 
    
          res.status(200).json(userData);
        });
      } catch (err) {
        res.status(400).json(err);
      }
    });

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.user.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.user.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect password, please try again' });
        return;
      }
      
      // get pending order inforamtion for this user, 
      // if no pending order, create one for this user
      const orderData = await Order.findOne( { where: { user_id : userData.id } }); 

      if (!orderData) {
        req.body.order.order_ref = uuID(); 
        req.body.order.user_id = userData.id; 

        orderData = await Order.create(req.body.order); 
      } 
      
      const order = orderData.get({ plain: true });

      // get order count for that order 
      const result = await sequelize.query(
                        'SELECT count(*) as item_count FROM order_item WHERE order_id = ?',
                        {
                          replacements: [order.id],
                          type: QueryTypes.SELECT
                        }
                      );
      
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.user_name = userData.name; 
        req.session.logged_in = true;
        req.session.order_id = order.id; 
        req.session.order_count = result[0].item_count; 
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      console.log('login error', err); 
      res.status(500).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  