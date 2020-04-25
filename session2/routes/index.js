const router = require('express').Router()

const auth = require('./auth')
const product = require('./product')
const carts = require('./carts')

router.use('/auth', auth)
router.use('/products', product) 
router.use('/carts', carts)

module.exports = router