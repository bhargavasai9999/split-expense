import { sequelize } from '../config/db.js'

export const GroupMember = sequelize.define(
  'GroupMember',
  {},
  { freezeTableName: true }
)
