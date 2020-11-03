const express = require('express')
const router = express.Router()
const { User, Session, Cart, CartItem } = require('../db')
const bcrypt = require('bcrypt');
const { response } = require('express');

const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

// GET /api/users
router.get('/', async(req, res, next) => {
  try {
      if(req.user.isAdmin) {
        console.log('\nAuthorized...\n')
        const users = await User.findAll()
        res.send(users)
      } 
  } catch (error) {
      console.log('\nGo Away...\n')
      res.status(401)
  }
})

// DELETE /api/users/:userID
router.delete('/:userID', async(req, res, next) => {
  try {
    if(req.user.isAdmin) {
      await User.destroy({where: {id: req.params.userID, isAdmin: false}})
      res.status(200)
    } 
  }
  catch (error){
    console.log('\nGo Away...\n')
    res.status(401)
    next(error)
  }
});

router.put('/:userID', async(req, res, next) => {
  try {
      const user = await User.findByPk(req.params.userID) 
      await user.update(req.body)
      res.json(user)
  }
  catch (error){
    console.log('\nGo Away...\n')
    res.status(401)
    next(error)
  }
});

// GET /api/users/:sessionId
router.get('/:sessionId', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.sessionId, {
      //we need to include the cart info w the user on login and on session recognition
      include: [
        {
          model: User,
          include: [ {
            model: Cart,
            include: [CartItem]
          }]
        }
      ]
    })
    //here and a few other places, it sends back the hashed password with the user object
    //although the hash comparison is done only on the server and it's not like you could unhash what we send, it is probably not best practice
    //maybe easiest solution is to empty out the password before sending? Like this:
    session.user.password = ''
    res.send(session.user)
  } catch (err) {
    next(err)
  }
})



// DELETE /api/users/:sessionId
router.delete('/:sessionId', async (req, res, next) => {
  try {
    await Session.destroy({
      where: {
        id: req.params.sessionId
      }
    })
    res.status(205).send()
  } catch (err) {
    next(err)
  }
})



// POST /api/users/
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

      //another password emptier:
      newUser.password = ''

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

// POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).send({
      message: 'Email and password must both be strings.',
    });
  } else {
    try {
      const foundUser = await User.findOne({
        where: {
          email,
        },
        //we need to include the cart info w the user on login and on session recognition
        include: [Session, {
          model: Cart,
          include: [CartItem]
        }],
      });

      const comparisonResult = await bcrypt.compare(password, foundUser.password);

      if (!comparisonResult) {
        throw new Error('Mismatched password!');
      }

          delete foundUser.password
      if (foundUser) {

        //another password emptier:
        foundUser.password = ''

        //maybe we don't actually need multiple sessions per user?
        //here, I've taken the first session and sent it back

        if (foundUser.sessions[0]) {
          res.cookie('sessionId', foundUser.sessions[0].id, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.status(200).send(foundUser);
        } else {
          const createdSession = await Session.create({});
          await createdSession.setUser(foundUser);

          res.cookie('sessionId', createdSession.id, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.status(201).send(foundUser);
        }
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      console.error(e.message);
      res.status(500).send({
        message: e.message,
      });
    }
  }
});

module.exports = router