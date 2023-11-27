import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import { User } from './User.js'
import { Expense } from './Expense.js'

export const Activity = sequelize.define(
  'Activity',
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    friendName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)
