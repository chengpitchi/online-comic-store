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

// Describe relationship between review and product and user 
Product.belongsToMany(User, {
    // Define the third table needed to store the foreign keys
    through: {
      model: Review,
      unique: false
    },
    // Define an alias for when data is retrieved
    as: 'product_reviews'
});

module.exports = {
  Product,
  Category,
  Review, 
};
