import express from 'express'
import { User } from '../models/User.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { Group } from '../models/Group.js'
import { Expense } from '../models/Expense.js'
import { Owe } from '../models/Owe.js'

const router = express.Router()

router.post('/splitExpense', authorizeUser, async (req, res) => {
  const { title, description, amount, friendIds } = req.body
  const expense = await Expense.create({
    title: title,
    description: description,
    amount: amount,
    userId: req.userId,
  })
  friendIds.forEach(async (friendId) => {
    const owe = await Owe.create({
      amount: amount / friendIds.length,
      userId: friendId,
      toUserId: req.userId,
      expenseId: expense.id,
    })
  })

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
  return res.status(200).send({ owe, owed })
})

router.get('/settle', authorizeUser, async (req, res) => {
  const owe = await Owe.update(
    { settle: true },
    { where: { id: req.body.oweId } }
  )
  return res.status(200).send({ message: 'settled successfully' })
})

export const ExpenseRouters = router
