const {Schema, model} = require('mongoose')

const cartSchema = new Schema({
  products: {
    required: true,
    type: Array
  },
  userId: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  }
})

const Cart = model('carts', cartSchema)

module.exports = Cart