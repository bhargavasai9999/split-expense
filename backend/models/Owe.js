import { DataTypes } from 'sequelize'
import { User } from './User.js'
import { Expense } from './Expense.js'
import { sequelize } from '../config/db.js'

export const Owe = sequelize.define(
  'Owe',
  {
    settle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)
