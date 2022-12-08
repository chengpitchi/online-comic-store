// import models
const Product = require('./Product');
const Category = require('./Category');
const Review = require('./Review'); 

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

module.exports = {
  Product,
  Category,
  Review, 
};
