import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import { User } from './User.js'
import { Expense } from './Expense.js'

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

Owe.belongsTo(User, { as: 'user', foreignKey: 'user_id' })
Owe.belongsTo(User, { as: 'lended user', foreignKey: 'to_user_id' })
Owe.belongsTo(Expense, { as: 'expense', foreignKey: 'expense_id' })
