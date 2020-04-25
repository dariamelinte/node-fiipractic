const httpStatusCode = require('http-status-codes')

const createCart = async (req, res) => {
  try {
    const {
      mongo: { ObjectId }
    } = require("mongoose");

    const products = await req.db.Product.find({
      _id: req.body.products.map(id => ObjectId(id))
    });

    let sum = 0;

    products.map(product => sum += product.price)

    const cart = await req.db.Cart.create({ ...req.body, price: sum });

    return (
      res
        .status(httpStatusCode.OK)
        .json({
          success: true,
          cart
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

const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const {
      mongo: { ObjectId }
    } = require("mongoose");

    const cart = await req.db.Cart.findOne({
      _id: ObjectId(cartId)
    });


    console.log(cart)

    const products = await req.db.Product.find({
      _id: cart.products.map(id => ObjectId(id))
    });

    cart.products = products;

    const user = await req.db.User.findOne({
      _id: ObjectId(cart.userId)
    }, {
      password: 0
    })

    return res.status(httpStatusCode.OK).json({
      success: true,
      cart: {
        ...cart.toObject(),
        user
      }
    })
  } catch (error) {
    console.error(error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happened!"
    });
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await req.db.Cart.find({})

    return res.status(httpStatusCode.OK).json({
      success: true,
      carts
    })
  } catch (error) {
    console.error('err', error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happened!"
    });
  }
}

const updateCart = (req, res) => {

}

const deleteCart = (req, res) => {

}

module.exports = {
  createCart,
  getCart,
  getCarts,
  updateCart,
  deleteCart
};
