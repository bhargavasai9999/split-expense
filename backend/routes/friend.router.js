import express from 'express'
import { User } from '../models/User.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { Friendship } from '../models/Friendship.js'

const router = express.Router()

router.post('/addFriend', authorizeUser, async (req, res) => {
  try {
    const { email } = req.body
    if (!email)
      return res.status(400).send({ message: 'Please enter email ID' })
    const user = await User.findByPk(req.userId)
    const friend = await User.findOne({ where: { email: email } })
    
    if (!friend) {
      return res.status(400).send({ message: 'friend email not found' })
    }
    await user.addFriends(friend)
    await friend.addFriends(user)
    return res.status(200).send({ message: 'friend added successfully' })
  } catch (err) {
    res.status(500).send({ message: 'something went wrong', err })
  }
})

router.get('/friends', authorizeUser, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId)

    const friends = await user.getFriends({
      attributes: ['name', 'email'],
    })
    res.status(200).send(
      friends.map((friend) => {
        return {
          email: friend.email,
          name: friend.name,
          friendId: friend.Friendship.friendId,
        }
      })
    )
  } catch (err) {
    res.status(500).send({ message: 'something went wrong', err })
  }
})

router.post('/deleteFriend', authorizeUser, async (req, res) => {
  try {
    await Friendship.destroy({
      where: { userId: req.userId, friendId: req.body.id },
    })
    // const user = await User.findByPk(req.userId)
    // const friend = await User.findByPk(req.body.id)

    // await user.removeFriends(friend)
    res.status(200).send({ message: 'friend deleted successfully' })
  } catch (err) {
    res.status(500).send({ message: 'something went wrong', err })
  }
})
export const FriendRouters = router
