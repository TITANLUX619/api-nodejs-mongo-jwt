'use strict'

const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express() 
const api = require('./routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

app.use('/api/v1', api)


module.exports = app