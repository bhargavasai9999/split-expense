import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import { Group } from './Group.js'

export const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

User.belongsToMany(User, {
  as: 'Friends', // Alias for the association
  through: 'Friendship', // Name of the join table
  foreignKey: 'userId', // Foreign key in the join table that points to the user
  otherKey: 'friendId', // Foreign key in the join table that points to the friend
})
