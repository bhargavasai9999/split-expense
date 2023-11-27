import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import { User } from './User.js'

export const Expense = sequelize.define(
  'Expense',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
)

Expense.belongsTo(User, { foreignKey: 'userId' })
