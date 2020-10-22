const express = require('express')
const router = express.Router()
const { User, Session } = require('../db')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const hashedPW = await bcrypt.hash(password, 10)
  try {
    const newUser = await User.create({ email, password: hashedPW})
    if(newUser) {
      const newSession = await Session.create()
      newSession.setUser(newUser)
      res.send({session: newSession.id, admin: newUser.isAdmin})
    }
  } catch (e) {
    console.log(e)
    res.status(400).send({
      message: 'Email address must be unique.'
    })
  }
})

module.exports = router
