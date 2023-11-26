import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { checkDbConnection, sequelize } from './config/db.js'
import { User } from './models/User.js'
import { Expense } from './models/Expense.js'
import { Owe } from './models/Owe.js'
import { Group } from './models/Group.js'

dotenv.config()
await checkDbConnection()
const app = express()

app.use(express.json())
app.use(cors())

sequelize
  .sync()
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

app.listen(5000, () => {
  console.log('server is running in the port 5000...')
})
