import express from 'express'
import { initializeApp } from 'firebase-admin/app'
import { User } from '../models/User.js'
import { signJwtToken } from '../utils/jwt.js'
import { getUserGoogleAuth } from '../utils/firebase.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const foundUser = await User.findOne({ where: { email: req.body.email } })
  console.log(foundUser)
  if (!foundUser) {
    res
      .status(400)
      .send({ message: 'Email is not registered with us, please sign up' })
    return
  }
  if (foundUser.password === req.body.password) {
    const userId = foundUser.id
    const jwt = signJwtToken(userId)
    res.status(200).send({
      message: 'User successfully authenticated',
      jwtToken: jwt,
      userDetails: {
        username: foundUser.name,
        email: foundUser.email,
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
      message: 'This email is already registered with us, Please Log In',
    })
  } else {
    const newUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    })

    res.status(200).send({ message: 'Successfully registered, Please Log In' })
  }
})

router.post('/google-auth', async (req, res) => {
  try {
    const user = await getUserGoogleAuth(req.body.accessToken)

    const foundUser = await User.findOne({ where: { email: user.email } })
    if (foundUser) {
      const jwt = signJwtToken(foundUser.id)
      return res.status(200).send({
        message: 'User successfully authenticated',
        jwtToken: jwt,
        userDetails: {
          username: foundUser.name,
          email: foundUser.email,
        },
      })
    }

    // if user not exist, create new account
    const newUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      isGoogleAuth: true,
    })
    const jwt = signJwtToken(newUser.id)
    return res.status(200).send({
      message: 'User successfully authenticated',
      jwtToken: jwt,
      userDetails: {
        username: newUser.name,
        email: newUser.email,
      },
    })
  } catch (err) {
    res.status(500)
    res.send({
      message: 'Something went wrong',
      err,
    })
  }
})

export const AuthRouters = router
