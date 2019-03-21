'use strict'


const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp(req, res){
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save(function(err) {
    if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`})
    
    return res.status(200).send({ 
      message: 'Te has registrado correctamente',
      token: service.createToken(user) })
  })
}

function signIn(req, res){
  console.log(req.body.email)

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if(!user) return res.status(404)({ message: 'No existe el usuario'})
    req.user = user
    console.log(user)

    res.status(200).send({
      message: `Te has logeado correctamente, bienvenido ${ req.user.displayName }`,
      token: service.createToken(user)
    })
  })

}

module.exports = {
  signUp,
  signIn
}
