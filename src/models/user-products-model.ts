import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config';

export const UserProduct = sequelize.define(
  'user_product',
  {
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    underscored: true,
  }
);

