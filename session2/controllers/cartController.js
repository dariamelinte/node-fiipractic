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

    const cart = await req.db.Cart.create({ ...req.body, value: sum });

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

const updateCart = async (req, res) => {
  try {
    const {
      mongo: { ObjectId }
    } = require("mongoose");

    const { cartId } = req.params

    const cart = await req.db.Cart.findOne({
      _id: ObjectId(cartId)
    })

    if (!cart) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        succes: false,
        message: 'The cart could not be found'
      })
    }

    const products = await req.db.Product.find({
      _id: req.body.products.map(id => ObjectId(id))
    });

    let sum = 0;

    products.map(product => sum += product.price)

    const result = await req.db.Cart.updateOne(
      {
        _id: ObjectId(cartId)
      },
      { ...req.body, value: sum}
    )


    console.log(result, { ...req.body, value: sum})

    const newCart = await req.db.Cart.findOne({ _id: ObjectId(cartId) })

    console.log('newCart', newCart)

    return res.status(httpStatusCode.OK).json({
      succes: true,
      cart: newCart
    })
  } catch (error) {
    console.error('err', error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happened!"
    });
  }
}

const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const {
      mongo: { ObjectId }
    } = require("mongoose");

    const cart = await req.db.Cart.findOne({
      _id: ObjectId(cartId)
    });

    if (!cart) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "The cart could not be found!"
      });
    }

    await req.db.Cart.deleteOne({
      _id: ObjectId(cartId)
    });

    return res.status(httpStatusCode.NO_CONTENT).json({
      success: true
    });
  } catch (error) {
    console.error('err', error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happened!"
    });
  }
}

module.exports = {
  createCart,
  getCart,
  getCarts,
  updateCart,
  deleteCart
};
