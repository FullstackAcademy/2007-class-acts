const express = require('express')
const router = express.Router()
const { User, Session } = require('../db')
const bcrypt = require('bcrypt')

const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

router.get('/:sessionId', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.sessionId, { include: [User] })
    res.send(session.user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const hashedPW = await bcrypt.hash(password, 10)
  try {
    const newUser = await User.create({ email, password: hashedPW})
    if(newUser) {
      const newSession = await Session.create()
      newSession.setUser(newUser)
      res.cookie('sessionId', newSession.id, {
        maxAge: A_WEEK_IN_SECONDS,
        path: '/'
      });
      res.status(201).send(newUser)
    }
  } catch (e) {
    console.log(e)
    //do something later to distinguish between existing user and other failure
    res.status(400).send({
      message: 'New user creation failed.'
    })
  }
})

module.exports = router
