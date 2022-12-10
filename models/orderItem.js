const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OrderItem extends Model {}

OrederItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },

    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id',
      },
      },
    
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
       },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
     }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'order',
  }
);

module.exports = Order;
