import express from 'express'
import { User } from '../models/User.js'
import { signJwtToken } from '../utils/jwt.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const foundUser = await User.findOne({ where: { email: req.body.email } })
  console.log(foundUser)
  if (!foundUser) {
    res.status(400).send({ message: 'Email is not registered with us' })
    return
  }
  if (foundUser.password === req.body.password) {
    const userId = foundUser.id
    console.log('===id', foundUser.id)
    const jwt = signJwtToken(userId)
    console.log(jwt)
    res.status(200).send({
      message: 'User successfully authenticated',
      jwtToken: jwt,
      userDetails: {
        username: foundUser.name,
        email: foundUser.email,
        isProfileCompleted: foundUser.isProfileCompleted,
      },
    })
  } else {
    res.status(400).send({ message: 'Invalid password' })
  }
})

router.post('/signup', async (req, res) => {
  const foundUser = await User.findOne({ where: { email: req.body.email } })
  if (foundUser) {
    return res.status(400).send({
      message: 'This email is already registered with us',
    })
  } else {
    const newUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    })

    res.status(200).send({ message: 'Successfully registered' })
  }
})

export const AuthRouters = router
