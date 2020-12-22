const { Session, User } = require('../db')

const auth = async (req, res, next) => {
  const { sessionId } = req.cookies

  if (!sessionId) {
    console.log('No session.')
    req.user = null
  } else {
    const session = await Session.findByPk(sessionId, {
      include: User,
    })
    if (!session) {
      console.log('Invalid sessionId.')
      res.clearCookie('sessionId')
      req.user = null
    } else {
      // You could update the expiry of the cookie here if desired.
      req.user = session.user
    }
  }

  next()
}

module.exports = auth
