const router = require('express').Router();
const sequelize = require('../config/connection');
const { Product } = require('../models');
const { Op } = require('sequelize'); 
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {  
  try {
    // get recommendation items
    const recomData = await Product.findAll({ 
      where: { highlighted_item: 1 }, 
      order: [['release_date', 'DESC']], 
    }); 

    const recommendations = recomData.map((item) => item.get({ plain: true })); 

    // get us comic items
    const usData = await Product.findAll({ 
      where: { country: "US", category_id: 1 }, 
      order: [['release_date', 'DESC']], 
    }); 

    const usComics = usData.map((item) => item.get({ plain: true })); 

    // get japan comic items
    const japanData = await Product.findAll({ 
      where: { country: "Japan", category_id: 1 }, 
      order: [['release_date', 'DESC']], 
    }); 

    const japanComics = japanData.map((item) => item.get({ plain: true })); 

    // get other comic items
    const otherData = await Product.findAll({ 
      where: { country: { [Op.notIn]: ["US", "Japan"] }, category_id: 1 }, 
      order: [['release_date', 'DESC']], 
    }); 

    const otherComics = otherData.map((item) => item.get({ plain: true })); 

    // get collectible items
    const collectData = await Product.findAll({ 
      where: { category_id: 2 }, 
      order: [['release_date', 'DESC']], 
    }); 

    const collectibles = collectData.map((item) => item.get({ plain: true })); 

    // get search list
    const searchData = await Product.findAll({ 
      order: [['product_name', 'ASC']], 
    }); 

    const searchList = searchData.map((item) => item.get({ plain: true })); 
    
    // render home page
    res.render('homepage', {
      recommendations,
      usComics,
      japanComics, 
      otherComics,
      collectibles, 
      searchList, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id, 
      user_name: req.session.user_name,
      order_id: req.session.order_id, 
      order_count: req.session.order_count
    }); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
