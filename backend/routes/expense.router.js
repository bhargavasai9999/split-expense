import express from 'express'
import { User } from '../models/User.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { Group } from '../models/Group.js'
import { Expense } from '../models/Expense.js'

const router = express.Router()

router.post('/splitExpense', authorizeUser, async (req, res) => {
  const { title, description, amount, emails } = req.body
  const expense = await Expense.create({
    title: title,
    description: description,
    amount: amount,
  })
})

export const GroupRouters = router
