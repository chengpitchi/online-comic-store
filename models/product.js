// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, 
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    image_url: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10,2), 
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 10, 
      validate: {
        isInt: true,
      },
    },
    release_date: {
        type: DataTypes.DATEONLY, 
        allowNull: false,
    },
    highlighted_item: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
