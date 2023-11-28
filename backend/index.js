import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { checkDbConnection, sequelize } from './config/db.js'
import { User } from './models/User.js'
import { Expense } from './models/Expense.js'
import { Owe } from './models/Owe.js'
import { Group } from './models/Group.js'
import { AuthRouters } from './routes/auth.router.js'
import { FriendRouters } from './routes/friend.router.js'
import { GroupRouters } from './routes/group.router.js'
import { ExpenseRouters } from './routes/expense.router.js'
import { Activity } from './models/Activity.js'

// Entity associations

Group.belongsToMany(User, {
  as: 'user', // Alias for the association
  through: 'GroupMember',
  foreignKey: 'groupId',
  otherKey: 'userId',
})
User.belongsToMany(Group, {
  as: 'group', // Alias for the association
  through: 'GroupMember',
  foreignKey: 'userId',
  otherKey: 'groupId',
})
User.belongsToMany(User, {
  as: 'Friends', // Alias for the association
  through: 'Friendship', // Name of the join table
  foreignKey: 'userId', // Foreign key in the join table that points to the user
  otherKey: 'friendId', // Foreign key in the join table that points to the friend
})

Activity.belongsTo(User, { foreignKey: 'userId' })
Activity.belongsTo(Expense, { foreignKey: 'userId' })
Expense.belongsTo(User, { foreignKey: 'userId' })
Owe.belongsTo(User, { as: 'user', foreignKey: 'userId' })
Owe.belongsTo(User, { as: 'lendedUser', foreignKey: 'toUserId' })
Owe.belongsTo(Expense, { as: 'expense', foreignKey: 'expenseId' })

dotenv.config()

// Check database connection
await checkDbConnection()

const app = express()

app.use(express.json())
app.use(cors())

// Sync all models to the database if relations not exist
sequelize
  .sync({
    alter: true,
  })

  .then((value) => {
    sequelize
      .getQueryInterface()
      .showAllTables()
      .then((tbls) => console.log('Available Tables', tbls))
  })
  .catch((err) => {
    console.log('table not cred', err)
  })

app.get('/', (req, res) => {
  return res.send('server is up and running...')
})

app.use(AuthRouters)
app.use(FriendRouters)
app.use(GroupRouters)
app.use(ExpenseRouters)

app.listen(process.env.PORT, () => {
  console.log('server is running in the port 5000...')
})
