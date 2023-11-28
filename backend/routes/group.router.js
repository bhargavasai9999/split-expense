import express from 'express'
import { User } from '../models/User.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { Group } from '../models/Group.js'
import { Sequelize } from 'sequelize'
import { GroupMember } from '../models/GroupMember.js'

const router = express.Router()
router.post('/group', authorizeUser, async (req, res) => {
  try {
    const { name, userIds } = req.body

    const group = await Group.create({ name })
    const members = await User.findAll({ where: { id: userIds } })
    const admin = await User.findByPk(req.userId)

    members.push(admin)
    await group.addUser(members)
    return res.status(200).send('Group created successfully')
  } catch (err) {
    res.status(500).send({ message: 'something went wrong', err })
  }
})
router.put('/group', authorizeUser, async (req, res) => {
  try {
    const { name, userIds, groupId } = req.body

    // Update group name
    const group = await Group.update(
      { name },
      {
        where: {
          id: groupId,
        },
      }
    )

    await GroupMember.destroy({
      where: {
        groupId,
      },
    })
    const bulkcreateRes = await GroupMember.bulkCreate(
      userIds.map((userId) => {
        return {
          groupId,
          userId,
        }
      })
    )

    res.status(200)
    res.send({
      message: 'Group modified successfully',
    })
  } catch (err) {
    res.status(500).send({ message: 'something went wrong', err })
  }
})

router.get('/group', authorizeUser, async (req, res) => {
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

router.get('/group/:id', authorizeUser, async (req, res) => {
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

router.delete('/group', authorizeUser, async (req, res) => {
  try {
    await Group.destroy({
      where: {
        id: req.body.groupId,
      },
    })
    res.status(200).send({
      message: 'Successfully deleted the group',
    })
  } catch (err) {
    res.status(500).send({ message: 'something went wrong', err })
  }
})

export const GroupRouters = router
