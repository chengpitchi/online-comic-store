// import models
const Product = require('./Product');
const Category = require('./Category');
const Review = require('./Review'); 
const User = require('./User'); 
const Order = require('./Order'); 
const OrderItem = require('./OrderItem'); 

// Describe relationship between product and category
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
}); 

Product.belongsTo(Category, {
  foreignKey: 'category_id',
}); 

// Describe relationship between review and product
Product.hasMany(Review, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
}); 
  
Review.belongsTo(Product, {
  foreignKey: 'product_id',
}); 

// Describe relationship between review and user
User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
}); 
  
Review.belongsTo(User, {
  foreignKey: 'user_id',
}); 

// Describe relationship between product and order item
Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
}); 
  
OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
});

// Describe relationship between order and order item
Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
}); 
  
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
});

// Describe relationship between order and user
User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
}); 
  
Order.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {
  Product,
  Category,
  Review, 
  User, 
  Order, 
  OrderItem, 
};
