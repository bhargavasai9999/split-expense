import express from 'express'
import { User } from '../models/User.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { Group } from '../models/Group.js'
import { Sequelize } from 'sequelize'

const router = express.Router()
router.post('/createGroup', authorizeUser, async (req, res) => {
  try {
    const { name, emails } = req.body

    const group = await Group.create({ name })
    const members = await User.findAll({ where: { email: emails } })
    const admin = await User.findByPk(req.userId)
    members.push(admin)
    await group.addUser(members)
    return res.status(200).send('Group created successfully')
  } catch (err) {
    res.status(500).send({ message: 'something went wrong', err })
  }
})

router.get('/groups', authorizeUser, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId)
    const groups = await user.getGroup({
      attributes: ['id', 'name'],
    })

    res.status(200).send(groups)
  } catch (err) {
    res.status(500).send({ message: 'something went wrong', err })
  }
})

router.get('/getMembers/:id', authorizeUser, async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id)
    const members = await group.getUser({
      attributes: ['id', 'name', 'email'],
    })
    res.status(200).send(members)
  } catch (err) {
    res.status(500).send({ message: 'something went wrong', err })
  }
})

export const GroupRouters = router
