// import models
const Product = require('./Product');
const Category = require('./Category');
const Review = require('./Review'); 

// Description relationship between product and category
/* Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
}); 

Product.belongsTo(Category, {
  foreignKey: 'category_id',
}); 
*/

module.exports = {
  Product,
  Category,
  Review, 
};
