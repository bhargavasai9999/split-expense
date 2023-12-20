import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import { User } from './User.js'

export const Group = sequelize.define(
  'Group',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)
