const router = require('express').Router();
const { User, Order } = require('../../models');
const uuID = require('../../utils/uuid'); 

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        //create a new pending order record for the new user
        const newOrder = JSON.stringify({ order_ref: uuID(), 
                                          status: 'P', 
                                          user_id: userData.id}); 
        console.log(newOrder); 
        const orderData = await Order.create(newOrder); 

        req.session.save(() => {
          req.session.user_id = userData.id;
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
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
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
        const newOrder =  JSON.stringify({ order_ref: uuID(), 
          status: 'P', 
          user_id: userData.id});

        console.log(newOrder);
        orderData = await Order.create(newOrder); 
/*        orderData = await fetch('/api/orders', {
          method: 'POST',
          body: newOrder,
          headers: { 'Content-Type': 'application/json' }, 
        }); */
      }
      console.log(orderData); 

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.order_id = orderData.id; 
        req.session.order_count = 0; 
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
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
  