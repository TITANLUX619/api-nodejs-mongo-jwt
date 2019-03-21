'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user){
  console.log(user)
  const payload = {
    user_id: user._id,
    email: user.email,
    admin: user.admin,
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, config.SECRET_TOKEN )
}


function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)
      console.log(payload)

      if (payload.exp <= moment().unix()){
        reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }

      resolve({ 
        user_id: payload.user_id, 
        email: payload.email,
        admin: payload.admin 
      })

    } catch (err){
      reject({
        status: 500,
        message: 'Invalid token'
      })
    }
  })

  return decoded
}
module.exports = {
  createToken,
  decodeToken
}
