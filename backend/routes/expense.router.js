import express from 'express'
import { User } from '../models/User.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { Group } from '../models/Group.js'
import { Expense } from '../models/Expense.js'
import { Owe } from '../models/Owe.js'
import { splitExpensesToUsers } from '../utils/calculateExpenses.js'
import { Activity } from '../models/Activity.js'

const router = express.Router()

router.post('/splitExpense', authorizeUser, async (req, res) => {
  try {
    const { title, description, amount, friendIds } = req.body
    const expense = await Expense.create({
      title: title,
      description: description,
      amount: amount,
      userId: req.userId,
    })
    const activity = await Activity.create({
      description: 'Paid to',
      friendName: 'store',
      amount: expense.amount,
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
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong', err })
  }
})

router.get('/oweAndOwed', authorizeUser, async (req, res) => {
  try {
    const owe = await Owe.findAll({
      where: { userId: req.userId, settle: false },

      include: [
        { model: User, as: 'user', attributes: ['id', 'name'] },
        { model: User, as: 'lendedUser', attributes: ['id', 'name'] },
      ],
    })
    const owed = await Owe.findAll({
      where: { toUserId: req.userId, settle: false },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name'] },
        { model: User, as: 'lendedUser', attributes: ['id', 'name'] },
      ],
    })
    let totalOwe = 0,
      totalOwed = 0
    owe.forEach((item) => (totalOwe += item.amount))
    owed.forEach((item) => (totalOwed += item.amount))
    return res.status(200).send({ owe, owed, totalOwe, totalOwed })
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong', err })
  }
})

router.post('/settle', authorizeUser, async (req, res) => {
  try {
    await Owe.update(
      { settle: true },
      {
        where: { id: req.body.oweId },
      }
    )
    const owe = await Owe.findByPk(req.body.oweId, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name'] },
        { model: User, as: 'lendedUser', attributes: ['id', 'name'] },
      ],
    })
    console.log(owe, owe.lendedUser, owe.user)
    const activityDetails = [
      {
        description: 'Paid to',
        friendName: owe.lendedUser.name,
        amount: owe.amount,
        userId: owe.user.userId,
      },
      {
        description: 'Recieved',
        friendName: owe.user.name,
        amount: owe.amount,
        userId: owe.lendedUser.id,
      },
    ]
    console.log(req.body)
    const activity = await Activity.bulkCreate(activityDetails)
    return res.status(200).send({ message: 'settled successfully' })
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong', err })
  }
})

router.get('/activity', authorizeUser, async (req, res) => {
  try {
    const activity = await Activity.findAll({ where: { userId: req.userId } })
    if (activity.length == 0)
      return res.status(400).send({
        message:
          'There is no activity currently. Get started by splitting expense.',
      })
    res.status(200).send(activity)
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong', err })
  }
})

export const ExpenseRouters = router
