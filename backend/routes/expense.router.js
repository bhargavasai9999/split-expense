import express from 'express'
import { User } from '../models/User.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { Group } from '../models/Group.js'
import { Expense } from '../models/Expense.js'
import { Owe } from '../models/Owe.js'
import { splitExpensesToUsers } from '../utils/calculateExpenses.js'

const router = express.Router()

router.post('/splitExpense', authorizeUser, async (req, res) => {
  const { title, description, amount, friendIds } = req.body
  const expense = await Expense.create({
    title: title,
    description: description,
    amount: amount,
    userId: req.userId,
  })
  const usersSplittedAmount = splitExpensesToUsers(
    friendIds,
    amount,
    req.userId
  )

  const owe = await Owe.bulkCreate(
    usersSplittedAmount.map((userSplitAmount) => {
      const settle = req.userId === userSplitAmount.userId
      return {
        userId: userSplitAmount.userId,
        toUserId: req.userId,
        amount: userSplitAmount.amount,
        settle,
        expenseId: expense.id,
      }
    })
  )

  return res.status(200).send({ message: 'successfully splitted' })
})

router.get('/oweAndOwed', authorizeUser, async (req, res) => {
  const owe = await Owe.findAll({
    where: { userId: req.userId, settle: false },

    include: [
      { model: User, as: 'user', attributes: ['id', 'name'] },
      { model: User, as: 'lended user', attributes: ['id', 'name'] },
    ],
  })
  const owed = await Owe.findAll({
    where: { toUserId: req.userId, settle: false },
    include: [
      { model: User, as: 'user', attributes: ['id', 'name'] },
      { model: User, as: 'lended user', attributes: ['id', 'name'] },
    ],
  })
  let totalOwe = 0,
    totalOwed = 0
  owe.forEach((item) => (totalOwe += item.amount))
  owed.forEach((item) => (totalOwed += item.amount))
  return res.status(200).send({ owe, owed, totalOwe, totalOwed })
})

router.get('/settle', authorizeUser, async (req, res) => {
  const owe = await Owe.update(
    { settle: true },
    { where: { id: req.body.oweId } }
  )
  return res.status(200).send({ message: 'settled successfully' })
})

router.get('/totalAmountOweAndOwed', authorizeUser, async (req, res) => {})

export const ExpenseRouters = router
