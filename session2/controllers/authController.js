const httpStatusCode = require('http-status-codes')

const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await req.db.User.findOne({
      email,
      password
    })

    if(!user) {
      return (
        res
          .status(httpStatusCode.NOT_FOUND)
          .json({
            success: false,
            message: 'User not found!'
          })
      )
    }

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          user
        })
    )

  } catch (error) {
    console.error(error)
    return (
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: 'Internal server error!'
        })
    )
  }
}

const register = async (req, res) => {
  try {
    const {body, db} = req
    const existingUser = await db.User.findOne({
      email: body.email
    })

    if (existingUser) {
      return (
        res
          .status(httpStatusCode.CONFLICT)
          .json({
            success: false,
            message: 'User already exists'
          })
      )
    }

    const user = await db.User.create(body)
    return (
      res
        .status(httpStatusCode.CREATED)
        .json({
          success: true,
          user
        })
    )
  } catch (error) {
    console.error(error)
    return (
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: 'Internal server error!'
        })
    )
  }
}

module.exports = {
  login,
  register
}