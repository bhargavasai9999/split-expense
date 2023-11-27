import { sequelize } from '../config/db.js'

export const Friendship = sequelize.define(
  'Friendship',
  {},
  { freezeTableName: true }
)
